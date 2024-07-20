import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { particlesSettings } from 'src/assets/particles';
declare var ScrollReveal: any;
declare var particlesJS: any;
declare var pJSDom: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  contactForm: HTMLElement | null = null;
  contactMessage: HTMLElement | null = null;
  scrollUp: HTMLElement | null = null;
  scrollToAboutLink: HTMLElement | null = null;
  scrollToContactLink: HTMLElement | null = null;

  themeButton: HTMLElement | null = null;
  particles: HTMLElement | null = null;

  particleSettings = particlesSettings;

  constructor() {}

  ngOnInit(): void {
    this.contactForm = document.getElementById('contact-form');
    this.contactMessage = document.getElementById('contact-message');
    this.scrollUp = document.getElementById('scroll-up');
    this.scrollToAboutLink = document.getElementById('scroll-about');
    this.scrollToContactLink = document.getElementById('scroll-contact');
    this.themeButton = document.getElementById('theme-button');
    this.particles = document.getElementById('particles-js');

    //* * * * * * * * * * * * * * * * EMAIL JS * * * * * * *
    const sendEmail = (e: any) => {
      e.preventDefault();

      // serviceID - templateID - #form - publicKey
      emailjs
        .sendForm(
          'service_wctjb5t',
          'template_r6cal5n',
          '#contact-form',
          'user_RiZbhi7D3Hzk50d4MROG4'
        )
        .then(() => {
          if (this.contactMessage) {
            this.contactMessage.textContent = 'Message sent successfully ✅';
          }
          setTimeout(() => {
            if (this.contactMessage) this.contactMessage.textContent = '';
          }, 5000);

          if (this.contactForm) {
            (this.contactForm as HTMLFormElement).reset();
          }
        });
    };
    this.contactForm?.addEventListener('submit', sendEmail);

    //* * * * * * * * * * * * * * * * SCROLL UP * * * * * * *
    const scrollUp = () => {
      window.scrollY >= 350
        ? this.scrollUp?.classList.add('show-scroll')
        : this.scrollUp?.classList.remove('show-scroll');
    };

    // Add smooth scrolling when the scroll-up button is clicked
    if (this.scrollUp) {
      this.scrollUp.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }

    window.addEventListener('scroll', scrollUp);

    //* * * * * * * * * * * * * * * * SCROLL TO ABOUT SECTION * * * * * * *
    if (this.scrollToAboutLink) {
      this.scrollToAboutLink.addEventListener('click', (event) => {
        event.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    //* * * * * * * * * * * * * * * * SCROLL TO CONTACT SECTION * * * * * * *
    if (this.scrollToContactLink) {
      this.scrollToContactLink.addEventListener('click', (event) => {
        event.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    //* * * * * * * * * * * * * * * * SCROLL REVEAL ANIMATIONS * * * * * * *
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
      // reset: true, // Animation reset
    });
    sr.reveal(`.home__perfil, .about__image, .contact__mail`, {
      origin: 'right',
    });
    sr.reveal(
      `.home__name, .home__intro, .home__info, .about__container .section__title-1, .about__info, .contact__social, .contact__data`,
      { origin: 'left' }
    );
    sr.reveal(`.services__card, .projects__container`, { interval: 100 });

    //* * * * * * * * * * * * * * * * DARK / LIGHT THEME CHANGE * * * * * * *
    const darkTheme = 'dark-theme';
    const iconTheme = 'ri-sun-line';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () =>
      this.themeButton?.classList.contains(iconTheme)
        ? 'ri-moon-line'
        : 'ri-sun-line';

    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
        darkTheme
      );
      this.themeButton?.classList[
        selectedIcon === 'ri-moon-line' ? 'add' : 'remove'
      ](iconTheme);
    }

    this.updateParticle(getCurrentTheme());

    this.themeButton?.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme);
      this.themeButton?.classList.toggle(iconTheme);
      console.log(getCurrentTheme());
      this.updateParticle(getCurrentTheme());
      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    });
  }

  updateParticle(theme: string): void {
    console.log(pJSDom);
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
    if (theme === 'light') {
      this.particleSettings.particles.shape.type = 'circle';
      particlesJS('particles-js', this.particleSettings);
    } else {
      this.particleSettings.particles.shape.type = 'star';
      particlesJS('particles-js', this.particleSettings);
    }
  }

  ngOnDestroy() {
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  }
}
