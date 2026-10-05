/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Sticky Js
03. Menu Controls JS
04. offcanvas Menu JS
05. offcanvas two Menu JS
06. Sidebar Js
07. AOS Js
08. Backtotop Js
09. Magnific Popup Js
10. Counter Js
11. Feature Widget Animation Js
12. Service Two Images Hover Animation Js
13. Bg Image For Attribute  Js
14. Mouse active Js





****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 01. PreLoader Js
  document.addEventListener("DOMContentLoaded", () => {
    // Create GSAP timeline
    const tl = gsap.timeline();
    const svg = document.getElementById("preloaderSvg");
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    // Text animation
    tl.to(".preloader-heading .load-text, .preloader-heading .cont", {
      delay: 1,
      y: -80,
      opacity: 0,
      duration: 0.6,
    })
      // SVG curve animation
      .to(svg, {
        duration: 0.6,
        attr: { d: curve },
        ease: "power2.inOut",
      })
      // Flatten SVG
      .to(svg, {
        duration: 0.6,
        attr: { d: flat },
        ease: "power2.inOut",
      })
      // Slide preloader up
      .to(".preloader", {
        y: "-130%",
        duration: 0.8,
        ease: "power4.inOut",
      })
      // Remove from DOM flow
      .set(".preloader", {
        display: "none",
        zIndex: -1,
      });
  });

  ////////////////////////////////////////////////////
  // 02. Sticky Js
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });

  ////////////////////////////////////////////////////
  // 03. Menu Controls JS
  $(".tw-hamburger-toggle").on("click", function () {
    $(".tw-header-side-menu").slideToggle("tw-header-side-menu");
  });
  if ($(".tw-main-menu-content").length && $(".tw-main-menu-mobile").length) {
    let navContent = document.querySelector(".tw-main-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".tw-main-menu-mobile");
    mobileNavContainer.innerHTML = navContent;
    let arrow = $(".tw-main-menu-mobile .has-dropdown > a");
    arrow.each(function () {
      let self = $(this);
      let arrowBtn = document.createElement("BUTTON");
      arrowBtn.classList.add("dropdown-toggle-btn");
      arrowBtn.innerHTML = "<i class='ph ph-caret-right'></i>";
      self.append(function () {
        return arrowBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("dropdown-opened");
        self.parent().toggleClass("expanded");
        self
          .parent()
          .parent()
          .addClass("dropdown-opened")
          .siblings()
          .removeClass("dropdown-opened");
        self.parent().parent().children(".tw-submenu").slideToggle();
      });
    });
  }

  ////////////////////////////////////////////////////
  // 04. offcanvas Menu JS
  $(".tw-offcanvas-open-btn").on("click", function () {
    $(".tw-offcanvas-2-area").addClass("opened");

    setTimeout(() => {
      $(".tw-text-hover-effect-word").addClass("animated-text");
    }, 900);
  });

  ////////////////////////////////////////////////////
  // 05. offcanvas two Menu JS
  $(".tw-offcanvas-2-close-btn").on("click", function () {
    setTimeout(() => {
      $(".tw-text-hover-effect-word").removeClass("animated-text");
    }, 1200);

    $(".tw-offcanvas-2-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 06. Sidebar Js
  $(".tw-menu-bar").on("click", function () {
    $(".twoffcanvas").addClass("opened");
    $(".body-overlay").addClass("apply");
  });
  $(".close-btn").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });
  $(".body-overlay").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });

  ////////////////////////////////////////////////////
  // 07. AOS Js
  AOS.init({
    once: false, // animation will happen every time you scroll
    offset: 0, // start animation when element enters the viewport
    anchorPlacement: "top-bottom", // when the bottom of the element hits the bottom of the screen
  });

  // 08. Backtotop Js
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  }
  back_to_top();

  ////////////////////////////////////////////////////
  // 09. Magnific Popup Js
  $(".open-popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  ////////////////////////////////////////////////////
  // 10. Counter Js
  new PureCounter();
  new PureCounter({
    filesizing: true,
    selector: ".filesizecount",
    pulse: 2,
  });

  ////////////////////////////////////////////////////
  // 11. Feature Widget Animation Js
  function service_animation() {
    var active_bg = $(".feature-widget .active-bg");
    var element = $(".feature-widget .current");
    $(".feature-widget .feature-2-item").on("mouseenter", function () {
      var e = $(this);
      activeService(active_bg, e);
    });
    $(".feature-widget").on("mouseleave", function () {
      element = $(".feature-widget .current");
      activeService(active_bg, element);
      element.closest(".feature-2-item").siblings().removeClass("mleave");
    });
    activeService(active_bg, element);
  }
  service_animation();
  function activeService(active_bg, e) {
    if (!e.length) {
      return false;
    }
    var topOff = e.offset().top;
    var height = e.outerHeight();
    var menuTop = $(".feature-widget").offset().top;
    e.closest(".feature-2-item").removeClass("mleave");
    e.closest(".feature-2-item").siblings().addClass("mleave");
    active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
  }
  $(".feature-widget .feature-2-item").on("click", function () {
    $(".feature-widget .feature-2-item").removeClass("current");
    $(this).addClass("current");
  });

  ////////////////////////////////////////////////////
  // 12. Service Two Images Hover Animation Js
  $(".service-two-list-wrap .service-two-list-item").on(
    "mouseenter",
    function () {
      $("#service-two-thumb").removeClass().addClass($(this).attr("rel"));
      $(this).addClass("active").siblings().removeClass("active");
    },
  );

  ////////////////////////////////////////////////////
  // 13. Bg Image For Attribute  Js
  $(".bg-img").each(function () {
    var img = $(this).data("background-image");
    if (img) {
      $(this).css("background-image", "url('" + img + "')");
    }
  });

  ////////////////////////////////////////////////////
  // 14. Mouse active Js
  $(document).ready(function () {
    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });

    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active");
      $(this)
        .parent()
        .siblings()
        .find(".service-ip-wrapper")
        .removeClass("active");
    });
  });

  $(document).ready(function () {
    const projects = [
      {
        id: "anonymiketech",
        name: "ANONYMIKETECH",
        status: "LIVE",
        category: "AI • Web • Cloud • Internet Solutions",
        description: "A technology and innovation platform focused on AI, web development, cloud solutions, internet services, and digital experiences.",
        image: "assets/images/logo/logo.png",
        alt: "ANONYMIKETECH logo",
        url: "https://anonymiketech.space",
        featured: true,
      },
      {
        id: "synth",
        name: "SYNTH",
        status: "COMING SOON",
        category: "AI Agent / Development Platform",
        description: "An intelligent development platform currently in active development.",
        image: "assets/images/thumbs/coming-soon-img.png",
        alt: "SYNTH coming soon visual",
        comingSoon: true,
      },
      {
        id: "economic-justice-forum",
        name: "ECONOMIC JUSTICE FORUM",
        status: "LIVE",
        category: "Web Development • Organization Website",
        description: "A professional web platform created for Economic Justice Forum.",
        image: "assets/images/thumbs/portfolio-three-thumb2.jpg",
        alt: "Economic Justice Forum project preview",
        url: "https://www.economicjusticeforum.org",
      },
      {
        id: "ecostruct-dynamics",
        name: "ECOSTRUCT DYNAMICS LTD",
        status: "LIVE",
        category: "Web Development • Corporate Website",
        description: "A professional corporate website created for EcoStruct Dynamics Ltd.",
        image: "assets/images/thumbs/portfolio-three-thumb4.jpg",
        alt: "EcoStruct Dynamics Ltd project preview",
        url: "https://www.ecostructdynamicsltd.com",
      },
    ];

    const workSection = document.getElementById("work");
    const viewProjectsButton = document.querySelector('.banner-three-button a[href="#work"]');

    if (workSection) {
      const renderProjects = (filter = "ALL") => {
        const visibleProjects = projects.filter((project) => filter === "ALL" || project.status === filter);
        workSection.innerHTML = `
          <div class="live-projects-shell">
            <div class="live-projects-heading">
              <div>
                <p class="live-projects-eyebrow">PROJECT ARCHIVE / 2026</p>
                <h2>Live Projects</h2>
                <p class="live-projects-intro">Selected platforms, client work, and the next generation of intelligent products.</p>
              </div>
              <div class="live-projects-filters" role="group" aria-label="Filter projects">
                ${["ALL", "LIVE", "COMING SOON"].map((filterName) => `<button type="button" class="live-project-filter ${filter === filterName ? "is-active" : ""}" data-project-filter="${filterName}">${filterName}</button>`).join("")}
              </div>
            </div>
            <div class="live-projects-grid">
              ${visibleProjects.map((project, index) => `
                <article class="live-project-card ${project.featured ? "is-featured" : ""} ${project.comingSoon ? "is-coming-soon" : ""}" style="--project-delay: ${index * 90}ms">
                  <div class="live-project-visual">
                    <span class="live-project-gridline"></span>
                    <img src="${project.image}" alt="${project.alt}" loading="lazy" />
                    ${project.featured ? '<span class="live-project-telemetry">SYSTEM ONLINE<br>LIVE PLATFORM<br>AI SYSTEMS</span>' : ""}
                  </div>
                  <div class="live-project-content">
                    <div class="live-project-status ${project.comingSoon ? "is-soon" : ""}"><span></span>${project.status}</div>
                    <h3>${project.name}</h3>
                    <p class="live-project-category">${project.category}</p>
                    <p class="live-project-description">${project.description}</p>
                    ${project.comingSoon ? '<span class="live-project-action disabled">IN DEVELOPMENT</span>' : `<a class="live-project-action" href="${project.url}" target="_blank" rel="noopener noreferrer">VIEW PROJECT <i class="ph ph-arrow-up-right" aria-hidden="true"></i><span class="visually-hidden"> ${project.name} in a new tab</span></a>`}
                  </div>
                </article>
              `).join("")}
            </div>
          </div>`;

        workSection.querySelectorAll("[data-project-filter]").forEach((button) => {
          button.addEventListener("click", () => renderProjects(button.dataset.projectFilter));
        });
        if (window.AOS) AOS.refresh();
      };

      renderProjects();
      viewProjectsButton?.addEventListener("click", (event) => {
        event.preventDefault();
        workSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    function initRipples() {
      $(".ripple-image").each(function () {
        var $container = $(this);
        var $img = $container.find("img").first();

        if ($img.length === 0) return;

        var img = new Image();
        img.src = $img.attr("src");

        img.onload = function () {
          var imgURL = img.src;

          $container.css({
            "background-image": "url(" + imgURL + ")",
            "background-size": "cover",
            "background-position": "center center",
          });

          // init ripples plugin
          if (typeof $container.ripples === "function") {
            $container.ripples({
              resolution: 400,
              perturbance: 0.03,
              imageUrl: imgURL,
            });
          }

          $img.hide();
        };
      });
    }

    initRipples();
  });
})(jQuery);
