import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navMenu: HTMLElement | null = null;
  navToggle: HTMLElement | null = null;
  navClose: HTMLElement | null = null;
  header: HTMLElement | null = null;

  navLinks: NodeListOf<HTMLElement> | null = null;
  sections: NodeListOf<HTMLElement> | null = null;

  constructor() {}

  ngOnInit(): void {
    this.navMenu = document.getElementById('nav-menu');
    this.navToggle = document.getElementById('nav-toggle');
    this.navClose = document.getElementById('nav-close');
    this.header = document.getElementById('header');

    //* * * * * * * * * * * * * * * * MENU MOBILE TOGGLE * * * * * * *
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => {
        this.navMenu?.classList.add('show-menu');
        console.log('natToggle');
      });
    }
    if (this.navClose) {
      this.navClose.addEventListener('click', () => {
        this.navMenu?.classList.remove('show-menu');
        console.log('navClose');
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

    //* * * * * * * * * * * * * * * * HIDES HEADER ON SCROLL * * * * * * *
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        if (this.header) this.header.style.top = '-88px'; // Adjust according to your header height
      } else {
        // Scrolling up
        if (this.header) {
          this.header.style.top = '0';
        }
      }
      // if (this.header) {
      //   const currentBackgroundColor = window.getComputedStyle(
      //     this.header
      //   ).backgroundColor;
      //   if (window.scrollY === 0) {
      //     this.header.style.backgroundColor = this.convertRgbToRgba(
      //       currentBackgroundColor,
      //       0
      //     );
      //   } else {
      //     this.header.style.backgroundColor = this.convertRgbToRgba(
      //       currentBackgroundColor,
      //       1
      //     );
      //   }
      // }
      lastScrollY = window.scrollY;
    });
  }

  // convertRgbToRgba(rgb: any, opacity: any) {
  //   const rgbValues = rgb.match(/\d+/g);
  //   return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
  // }
}
