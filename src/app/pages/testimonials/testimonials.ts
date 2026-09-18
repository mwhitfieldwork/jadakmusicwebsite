import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TESTIMONIALS } from '../../core/site-content';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  protected readonly testimonials = TESTIMONIALS;
  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);

  private readonly fb = new FormBuilder();

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    eventType: [''],
    review: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // NOTE: this is a frontend-only stub for now. Once the .NET API +
    // Postgres backend is wired up, this should POST to an endpoint like
    // /api/testimonials that stores the review with status "pending" so it
    // shows up as a notification in the admin app for approval before it
    // appears on this page.
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.form.reset();
    }, 600);
  }
}
