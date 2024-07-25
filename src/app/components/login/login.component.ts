import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AuthService} from "../../core/services/auth.service";
import {filter, finalize} from "rxjs";
import {TokenService} from "../../core/services/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ValidatorComponent} from "../validator/validator.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'payme-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ValidatorComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    MatProgressSpinner,
    MatIconButton,
    MatIcon,
    MatFormFieldModule,
  ],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  hide = signal(true);
  destroyRef = inject(DestroyRef)

  constructor(
    private service: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private activated: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit() {
    this.createForm()
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      this.service.login(this.form.value)
        .pipe(
          filter(res => !!res),
          finalize(() => this.loading = false),
          takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
          this.tokenService.setTokens(res.token);
          this.router.navigate([this.activated.snapshot.queryParams['returnUrl'] || '/'])
            .catch();
        })
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['nurlan@payme.uz', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required]],
    })
  }
}
