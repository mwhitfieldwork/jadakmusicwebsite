import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PRICING, RECEIPT_SERVICE_URL } from '../../core/site-content';

/**
 * Booking + down-payment UI.
 *
 * STATUS: wired up to the .NET receipt-service backend's
 * POST /create-checkout-session endpoint (Phase 2), instead of the old
 * static Stripe Payment Link. "Pay Down Payment" validates the form,
 * POSTs these details - including the computed deposit amount, so the
 * visitor never has to re-type it on Stripe's page like before - and
 * redirects the browser straight to the Stripe-hosted checkout page the
 * backend creates. That backend attaches the event date/location/notes
 * below as metadata on the Checkout Session, which is what lets the
 * emailed PDF receipt include them.
 *
 * WHY STILL A REDIRECT, NOT FULLY EMBEDDED: the customer still briefly
 * lands on Stripe's own checkout page rather than paying directly on this
 * site - that's a deliberate, smaller-scope choice over building a fully
 * custom Stripe Elements payment form in Angular, which is a bigger lift
 * for later if ever wanted.
 */
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  protected readonly pricing = PRICING;
  protected readonly minDate = new Date();
  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  private readonly fb = new FormBuilder();
  private readonly http = inject(HttpClient);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    event: ['', Validators.required],
    date: [null as Date | null, Validators.required],
    location: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    estimatedHours: [2, [Validators.min(1)]],
    instructions: [''],
    setupRequirements: [''],
  });

  get estimatedTotal(): number {
    const hours = this.form.controls.estimatedHours.value || 0;
    return hours * this.pricing.hourlyRate;
  }

  get estimatedDeposit(): number {
    return Math.round(this.estimatedTotal * (this.pricing.depositPercent / 100));
  }

  payDeposit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitError.set(null);
    this.isSubmitting.set(true);

    const value = this.form.getRawValue();
    const eventDate = value.date
      ? value.date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    this.http
      .post<{ url: string }>(`${RECEIPT_SERVICE_URL}/create-checkout-session`, {
        customerName: value.name,
        customerEmail: value.email,
        depositAmount: this.estimatedDeposit,
        eventDate,
        performanceLocation: value.location,
        instructions: value.instructions || null,
        setupRequirements: value.setupRequirements || null,
      })
      .subscribe({
        next: (res) => {
          // A full browser redirect, not an Angular route change - this URL
          // is Stripe's own hosted checkout page, not part of this app.
          window.location.href = res.url;
        },
        error: () => {
          this.isSubmitting.set(false);
          this.submitError.set(
            'Something went wrong starting your payment - please try again, or contact Jada directly if it keeps happening.'
          );
        },
      });
  }
}