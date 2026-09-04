import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

type AuthHighlight = {
  title: string;
  detail: string;
};

@Component({
  selector: 'maj-landing',
  imports: [RouterOutlet],
  templateUrl: './auth-landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './auth-landing.scss',
})
export class AuthLanding {
  private readonly router = inject(Router);

  public readonly appTitle = 'Maj.eVal';
  public readonly appTagLine = 'Bridging the Gap Between Knowledge and Mastery.';

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  public readonly isSignUp = computed(() => this.currentUrl().includes('sign-up'));

  public readonly brandHeading = computed(() =>
    this.isSignUp() ? 'Start your learning journey' : 'Welcome back to mastery',
  );

  public readonly brandDescription = computed(() =>
    this.isSignUp()
      ? 'Create your profile once and unlock assessments, progress tracking, and guided practice built around how you learn.'
      : 'Pick up where you left off — exams, insights, and personalized practice are ready when you are.',
  );

  public readonly highlights = computed<AuthHighlight[]>(() =>
    this.isSignUp()
      ? [
          {
            title: 'Structured assessments',
            detail: 'Practice with exams designed to measure real understanding.',
          },
          {
            title: 'Clear progress signals',
            detail: 'See strengths, gaps, and what to study next.',
          },
          {
            title: 'One learner profile',
            detail: 'Keep your identity, history, and goals in sync.',
          },
        ]
      : [
          {
            title: 'Secure access',
            detail: 'Your account and exam history stay private to you.',
          },
          {
            title: 'Continuity',
            detail: 'Resume unfinished work without losing momentum.',
          },
          {
            title: 'Focused practice',
            detail: 'Return to the topics that move your score forward.',
          },
        ],
  );
}
