import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
declare var ScrollReveal: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  navMenu: HTMLElement | null = null;
  navToggle: HTMLElement | null = null;
  navClose: HTMLElement | null = null;
  header: HTMLElement | null = null;
  contactForm: HTMLElement | null = null;
  contactMessage: HTMLElement | null = null;
  scrollUp: HTMLElement | null = null;
  scrollToAboutLink: HTMLElement | null = null;
  scrollToContactLink: HTMLElement | null = null;
  themeButton: HTMLElement | null = null;
  navLinks: NodeListOf<HTMLElement> | null = null;
  sections: NodeListOf<HTMLElement> | null = null;

  constructor() {}

  ngOnInit(): void {
    this.navMenu = document.getElementById('nav-menu');
    this.navToggle = document.getElementById('nav-toggle');
    this.navClose = document.getElementById('nav-close');
    this.header = document.getElementById('header');
    this.contactForm = document.getElementById('contact-form');
    this.contactMessage = document.getElementById('contact-message');
    this.scrollUp = document.getElementById('scroll-up');
    this.scrollToAboutLink = document.getElementById('scroll-about');
    this.scrollToContactLink = document.getElementById('scroll-contact');
    this.themeButton = document.getElementById('theme-button');

    //* * * * * * * * * * * * * * * * MENU MOBILE TOGGLE * * * * * * *
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => {
        this.navMenu?.classList.add('show-menu');
      });
    }
    if (this.navClose) {
      this.navClose.addEventListener('click', () => {
        this.navMenu?.classList.remove('show-menu');
      });
    }

    //* * * * * * * * * * * * * * * * REMOVE MENU MOBILE * * * * * * *
    this.navLinks = document.querySelectorAll('.nav__link');
    const linkAction = () => {
      this.navMenu?.classList.remove('show-menu');
    };
    if (this.navLinks) {
      this.navLinks.forEach((n: any) =>
        n.addEventListener('click', () => linkAction)
      );
    }

    //* * * * * * * * * * * * * * * * HEADER SHADOW * * * * * * *
    const shadowHeader = () => {
      if (window.scrollY >= 50 && this.header) {
        this.header.classList.add('shadow-header');
      } else if (this.header) {
        this.header.classList.remove('shadow-header');
      }
    };
    console.log(window.scrollY);
    window.addEventListener('scroll', shadowHeader);

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

    //* * * * * * * * * * * * * * * * NAVIGATION FUNCTION * * * * * * *
    this.sections = document.querySelectorAll('section[id]');

    // Add smooth scrolling to navigation links
    if (this.navLinks) {
      this.navLinks.forEach((n: any) => {
        n.addEventListener('click', (event: { preventDefault: () => void }) => {
          event.preventDefault(); // Prevent the default behavior of the link
          const targetId = n.getAttribute('href').substring(1); // Get the target section's id
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            this.navMenu?.classList.remove('show-menu'); // Close the menu
          }
        });
      });
    }

    const scrollActive = () => {
      const scrollDown = window.scrollY;

      if (this.sections) {
        this.sections.forEach((current) => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 58;
          const sectionId = current.getAttribute('id');
          const sectionClass = document.querySelector(
            '.nav__menu a[href="#' + sectionId + '"]'
          );

          if (sectionClass) {
            if (
              scrollDown >= sectionTop &&
              scrollDown < sectionTop + sectionHeight
            ) {
              sectionClass.classList.add('active-link');
            } else {
              sectionClass.classList.remove('active-link');
            }
          }
        });
      }
    };
    window.addEventListener('scroll', scrollActive);

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

    this.themeButton?.addEventListener('click', () => {
      document.body.classList.toggle(darkTheme);
      this.themeButton?.classList.toggle(iconTheme);

      localStorage.setItem('selected-theme', getCurrentTheme());
      localStorage.setItem('selected-icon', getCurrentIcon());
    });

    //* * * * * * * * * * * * * * * * SCROLL REVEAL ANIMATIONS * * * * * * *
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
      // reset: true // Animation reset
    });
    sr.reveal(`.home__perfil, .about__image, .contact__mail`, {
      origin: 'right',
    });
    sr.reveal(
      `.home__name, .home__info, .about__container .section__title-1, .about__info, .contact__social, .contact__data`,
      { origin: 'left' }
    );
    sr.reveal(`.services__card, .projects__card`, { interval: 100 });
  }
}
