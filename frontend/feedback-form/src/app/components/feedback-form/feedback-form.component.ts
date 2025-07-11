import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { FeedbackService } from '../../feedback.service';
import { DesignationService } from '../../designation.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule
  ],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  Object = Object;
  currentSection = 0;
  maxSections = 4;

  formData: any = {
    name: '',
    number: '',
    email: '',
    designation: '',
    country: '',
    company: '',
    installation: '',
    products: [],
    details: [],
    users: [],
    installationQuality: '',
    parameterAccuracy: '',
    dataReliability: '',
    dashboardUsability: '',
    maintenanceImpact: '',
    downtimeReduction: '',
    supportExperience: '',
    suggestions: '',
    rating: '',
    feedback: ''
  };

  designations: string[] = [];
  showOtherDesignation = false;
  otherDesignation = '';

  constructor(
    private feedbackService: FeedbackService,
    private designationService: DesignationService
  ) {}

  ngOnInit() {
    this.fetchDesignations();
  }

  fetchDesignations() {
    const defaults = ['Maintenance Engineer', 'Plant Head', 'Mechanical Engineer'];

    this.designationService.getDesignations().subscribe({
      next: (data: any[]) => {
        const dbStrings = (data || []).map((d: any) => d.name || d.designation || '');
        const allDesignations = new Set([...defaults, ...dbStrings]);
        this.designations = [...allDesignations, 'Other'];
        console.log('Fetched designations:', this.designations);
      },
      error: (err) => {
        console.error('Error fetching designations:', err);
        this.designations = [...defaults, 'Other'];
      }
    });
  }

  checkOtherDesignation() {
    this.showOtherDesignation = this.formData.designation === 'Other';
  }

  countriesWithCompanies: Record<string, string[]> = {
    India: ['UltraTech', 'ACC', 'Ambuja'],
    USA: ['Cemex', 'Lafarge'],
    Germany: ['HeidelbergCement', 'Dyckerhoff'],
  };

  cementCompanies: string[] = [];

  onCountryChange() {
    this.cementCompanies = this.countriesWithCompanies[this.formData.country] || [];
    this.formData.company = '';
  }

  goToNext() {
    const formControls = document.querySelectorAll('form input, form select, form textarea');
    let isValid = true;

    formControls.forEach((control: any) => {
      if (control.offsetParent !== null && !control.checkValidity()) {
        control.reportValidity();
        isValid = false;
      }
    });

    if (isValid) {
      this.currentSection++;
    }
  }

  goToPrevious() {
    if (this.currentSection > 0) {
      this.currentSection--;
    }
  }

  onCheckboxChange(event: any, category: string) {
  const value = event.target.value;
  const checked = event.target.checked;

  if (!this.formData[category]) {
    this.formData[category] = [];
  }

  if (checked) {
    this.formData[category].push(value);
  } else {
    const index = this.formData[category].indexOf(value);
    if (index !== -1) {
      this.formData[category].splice(index, 1);
    }
  }
}


  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // OTP Verification
  otpSent = false;
  otpVerified = false;
  otpError = false;
  enteredOtp = '';

  sendOtp(): void {
    if (!this.formData.email) {
      alert('⚠️ Please enter an email before requesting OTP.');
      return;
    }

    this.feedbackService.sendOtp(this.formData.email).subscribe({
      next: () => {
        this.otpSent = true;
        this.otpVerified = false;
        this.otpError = false;
        alert('✅ OTP sent to your email!');
      },
      error: (err) => {
        console.error('OTP send error:', err);
        alert('❌ Failed to send OTP. Please try again later.');
      }
    });
  }

  verifyOtp(): void {
    if (!this.enteredOtp) {
      alert('⚠️ Please enter the OTP.');
      return;
    }

    this.feedbackService.verifyOtp(this.formData.email, this.enteredOtp).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.otpVerified = true;
          this.otpError = false;
          alert('✅ Email verified successfully!');
        } else {
          this.otpVerified = false;
          this.otpError = true;
          alert('❌ Invalid OTP. Please check and try again.');
        }
      },
      error: (err) => {
        console.error('OTP verification error:', err);
        this.otpVerified = false;
        this.otpError = true;
        alert('❌ Verification failed. Please try again later.');
      }
    });
  }

  onSubmit() {
    if (this.showOtherDesignation && this.otherDesignation) {
      this.formData.designation = this.otherDesignation;
      this.saveDesignation(this.otherDesignation);
    }

    this.feedbackService.submitFeedback(this.formData).subscribe({
      next: () => {
        alert('✅ Feedback submitted successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Form submit error:', err);
        alert('❌ Failed to submit feedback. Try again.');
      }
    });
  }

  saveDesignation(newDes: string) {
    this.designationService.addDesignation({ designation: newDes }).subscribe({
      next: () => {
        console.log('✅ New designation saved to DB');
        this.fetchDesignations(); // Refresh after saving
      },
      error: (err) => console.error('❌ Failed to save designation:', err)
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      number: '',
      email: '',
      designation: '',
      country: '',
      company: '',
      installation: '',
      products: [],
      details: [],
      users: [],
      installationQuality: '',
      parameterAccuracy: '',
      dataReliability: '',
      dashboardUsability: '',
      maintenanceImpact: '',
      downtimeReduction: '',
      supportExperience: '',
      suggestions: '',
      rating: '',
      feedback: ''
    };
    this.currentSection = 0;
    this.cementCompanies = [];
    this.otpSent = false;
    this.otpVerified = false;
    this.otpError = false;
    this.enteredOtp = '';
    this.showOtherDesignation = false;
    this.otherDesignation = '';
  }
}
