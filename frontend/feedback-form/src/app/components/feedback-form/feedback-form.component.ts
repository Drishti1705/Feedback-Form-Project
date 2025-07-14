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
import { ChangeDetectorRef } from '@angular/core';


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
    installationQuality: '',
    parameterAccuracy: '',
    dataReliability: '',
    dashboardUsability: '',
    maintenanceImpact: '',
    downtimeReduction: '',
    supportExperience: '',
    suggestions: '',
    rating: '',
    feedback: '',
    fillPacFeedback: '',
    bucketElevatorFeedback: '',
    bucketinstallation: '',
    fillpacinstallation: '',
    selectedProducts: []
  };

  designations: string[] = [];
  showOtherDesignation = false;
  otherDesignation = '';

  countriesWithCompanies: Record<string, string[]> = {
    India: ['UltraTech', 'ACC', 'Ambuja'],
    USA: ['Cemex', 'Lafarge'],
    Germany: ['HeidelbergCement', 'Dyckerhoff'],
  };

  cementCompanies: string[] = [];

  otpSent = false;
  otpVerified = false;
  otpError = false;
  enteredOtp = '';
  userEmail: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private designationService: DesignationService,
    private cdRef: ChangeDetectorRef // 👈 Add this

  ) {}

  ngOnInit(): void {
  this.fetchDesignations(); // ✅ Use your improved method
}


  fetchDesignations() {
  const defaultList = ['Maintenance Engineer', 'Plant Head', 'Mechanical Engineer'];

  this.designationService.getDesignations().subscribe({
    next: (data: any[]) => {
      console.log('📦 Fetched from DB:', data);

      // ✅ No mapping needed — data is already string[]
      const dbList = data.filter(v => typeof v === 'string' && v.trim());

      const merged = [...new Set([...defaultList, ...dbList, 'Other'])];
      console.log('✅ Final dropdown list:', merged);

      this.designations = merged;
      this.cdRef.detectChanges();
    },
    error: (err) => {
      console.error('❌ Failed to load designations:', err);
      this.designations = [...defaultList, 'Other'];
      this.cdRef.detectChanges();
    }
  });
}

  checkOtherDesignation() {
    this.showOtherDesignation = this.formData.designation === 'Other';
  }

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

    if (this.currentSection === 1) {
      if (!this.otpSent) {
        alert('⚠️ Please request an OTP to verify your email before proceeding.');
        return;
      }
      if (!this.otpVerified) {
        alert('⚠️ Please verify your email with the OTP before proceeding.');
        return;
      }
    }

    if (isValid) {
      this.currentSection++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPrevious() {
    if (this.currentSection > 0) {
      this.currentSection--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onProductToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    const list = this.formData.selectedProducts;

    if (checkbox.checked && !list.includes(value)) {
      list.push(value);
    } else if (!checkbox.checked) {
      const index = list.indexOf(value);
      if (index > -1) list.splice(index, 1);
    }
  }

  showFillPacFeedback(): boolean {
    return this.formData.selectedProducts.includes('Fill Pac');
  }

  showBucketElevatorFeedback(): boolean {
    return this.formData.selectedProducts.includes('Bucket Elevator');
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

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
    this.formData.designation = this.otherDesignation.trim();
    this.saveDesignation(this.otherDesignation); // Save to DB
  }

  console.log('✅ Submitting formData:', this.formData);

  this.feedbackService.submitFeedback(this.formData).subscribe({
    next: () => {
      alert('✅ Feedback submitted successfully!');
      this.resetForm();

      // ✅ Ensure new designation appears in dropdown after reset
      this.fetchDesignations();
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

      // 🔁 Only fetch after saving to ensure it's available
      this.fetchDesignations();
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
      installationQuality: '',
      parameterAccuracy: '',
      dataReliability: '',
      dashboardUsability: '',
      maintenanceImpact: '',
      downtimeReduction: '',
      supportExperience: '',
      suggestions: '',
      rating: '',
      feedback: '',
      fillPacFeedback: '',
      bucketElevatorFeedback: '',
      bucketinstallation: '',
      fillpacinstallation: '',
      selectedProducts: []
    };

    this.currentSection = 0;
    this.cementCompanies = [];
    this.otpSent = false;
    this.otpVerified = false;
    this.otpError = false;
    this.enteredOtp = '';
    this.showOtherDesignation = false;
    this.otherDesignation = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
