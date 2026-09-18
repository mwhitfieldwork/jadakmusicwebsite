import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT_CONTENT } from '../../core/site-content';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: '../shared-page.scss',
})
export class Contact {
  protected readonly content = CONTACT_CONTENT;
  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);

  private readonly fb = new FormBuilder();

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // NOTE: frontend-only stub. Wire this up to the .NET API (e.g. POST
    // /api/contact) once the backend phase starts, so messages land in the
    // admin app / forward to info@jadakmusic.com.
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.form.reset();
    }, 600);
  }
}
