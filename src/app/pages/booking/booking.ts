import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PRICING } from '../../core/site-content';

/**
 * Booking + deposit/final-payment UI.
 *
 * STATUS: frontend-only stub for this phase. The "Pay Down Payment" button
 * validates the form and reveals the payment-method section below, but no
 * real charge happens yet — there's no Stripe key, no backend, and no
 * PaymentIntent. The next phase wires this up for real:
 *
 *   1. Backend (.NET API) creates a Stripe PaymentIntent (deposit amount)
 *      and returns its client secret.
 *   2. Frontend mounts the Stripe Payment Element with that client secret.
 *      The Payment Element automatically shows Card + Link on desktop and
 *      Apple Pay / Google Pay on supported mobile browsers — Stripe's own
 *      Payment Request API detects wallet availability, which is more
 *      reliable than guessing from screen width. See the README for the
 *      full integration plan and package to install
 *      (`@stripe/stripe-js` + `@stripe/stripe-js` Elements, no separate
 *      Angular wrapper needed).
 *   3. A second PaymentIntent (or an off-session confirmation on the same
 *      customer) collects the final installment once Jada approves the
 *      completed event.
 *
 * For now the "desktop vs. smaller devices" split the button structure
 * below shows is a CSS-only approximation (see booking.scss) so the layout
 * and copy are ready to receive the real Payment Element.
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
  protected readonly showPayment = signal(false);
  protected readonly minDate = new Date();

  private readonly fb = new FormBuilder();

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    event: ['', Validators.required],
    date: [null as Date | null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    estimatedHours: [2, [Validators.min(1)]],
  });

  get estimatedTotal(): number {
    const hours = this.form.controls.estimatedHours.value || 0;
    return hours * this.pricing.hourlyRate;
  }

  get estimatedDeposit(): number {
    return Math.round(this.estimatedTotal * (this.pricing.depositPercent / 100));
  }

  revealPayment(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.showPayment.set(true);
  }
}
