import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PRICING, STRIPE_PAYMENT_LINKS } from '../../core/site-content';

/**
 * Booking + down-payment UI.
 *
 * STATUS: wired up to a Stripe Payment Link (no backend). "Pay Down
 * Payment" validates the form, then opens Stripe's hosted checkout in a
 * new tab, with the customer's email pre-filled. Because it's a Stripe
 * Payment Link with "customer chooses price" pricing, the visitor still
 * has to type in the deposit amount themselves on that page — the amount
 * is shown clearly here beforehand so it's obvious what to enter.
 *
 * WHY NOT FULLY AUTOMATIC: a truly one-click flow (amount sent
 * automatically, no re-typing) needs a server to create a Stripe
 * PaymentIntent for the exact amount — Stripe's secret key can never live
 * in frontend code. That's the Phase 2 (.NET API) upgrade; see the
 * STRIPE_PAYMENT_LINKS comment in site-content.ts for the full plan. This
 * Payment Link approach is a deliberate, functional stand-in until then —
 * not a mistake to "fix" later, just phase 1 of payments.
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

  /** Stripe Payment Link URL with the customer's email pre-filled. */
  get depositLink(): string {
    const email = this.form.controls.email.value;
    const url = new URL(STRIPE_PAYMENT_LINKS.deposit);
    if (email) {
      url.searchParams.set('prefilled_email', email);
    }
    return url.toString();
  }

  revealPayment(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.showPayment.set(true);
  }
}
