import Glide from "@glidejs/glide";
import "core-js/stable";

let onClickMenuEnabled = false;
let active_nav_el = null;
// Burger menu active function

const onClickMenu = () => {
	document.getElementById("menu_btn").classList.toggle("change");
	document.getElementById("nav_list").classList.toggle("change");
	document.getElementById("logo").classList.toggle("change");
	document.getElementById("logo_img").classList.toggle("change");
	document.getElementById("logo_text").classList.toggle("change");
	onClickMenuEnabled = !onClickMenuEnabled;


	if(onClickMenuEnabled) {
		document.body.style.overflow = "hidden";
	}
	else {
		document.body.style.overflow = "auto";
	}


}

//Scrolling functions onClickEvent

const onClickNavLink = (e) => {
	let section_object_top = document.querySelector(/\#\w+$/.exec(e.target.href)[0]).offsetTop;

	if(onClickMenuEnabled) {
		onClickMenu();
	}

	window.scrollTo(0, section_object_top);
}

const onClickGetQuote = () => {
	let quote_form_top = document.getElementById("feedback").offsetTop;

	window,scrollTo({
		top: quote_form_top,
		behavior: "smooth"
	});
}

document.getElementById("menu_btn").addEventListener("click", onClickMenu)


Array.from(document.querySelectorAll(".nav_link, .footer_section_link")).forEach(el => {
	el.addEventListener("click", onClickNavLink)
});

Array.from(document.querySelectorAll(".general_info_btn, .get_free_quote_btn, .price_list_get_quote_btn")).forEach(el => {
	el.addEventListener('click', onClickGetQuote)
});

//Scroll Events

if("IntersectionObserver" in window &&
	"IntersectionObserverEntry" in window &&
   "intersectionRatio" in 
	window.IntersectionObserverEntry.prototype
	) {
			let options = {
				root: document,
				rootMargin: '0px',
				threshold: 0.5
			};

			let observer = new IntersectionObserver(entries => {
				if(active_nav_el) active_nav_el.classList.remove('active_nav')

				for(let i = 0; i < entries.length; i++) {
					if(entries.length > 1) break;
				   let section_el = document.querySelector(/\#\w+$/.exec('#' + entries[i].target.id)[0]);
					active_nav_el = Array.from(document.querySelectorAll('.nav_link')).find(el => {
						return el.getAttribute("href").split("#").pop() === section_el.getAttribute("id");
					}).parentNode;

					if(active_nav_el) active_nav_el.classList.add('active_nav');
				} 

			}, options);

			
			Array.from(document.querySelectorAll("#tech_stack_section, #portfolio_section, #price_list_section, #feedback")).forEach(el => {
				observer.observe(el)
			})
	  }

// Hover events

Array.from(document.querySelectorAll(".nav_el")).forEach(el => {
	el.addEventListener('mouseover', () => {
		Array.from(document.querySelectorAll(".nav_el")).forEach(el => {
			el.classList.remove("active_nav");
		})
	})
})

Array.from(document.querySelectorAll(".tech_section_slide")).forEach(el => {
	el.addEventListener('mouseover', () => {
		Array.from(document.querySelectorAll(".tech_section_slide")).forEach(el => {
			el.parentNode.classList.remove("glide__slide--active");
		});

		el.parentNode.classList.add("glide__slide--active");
	});
});

//Sliders section

const tech_section_glide = new Glide('#tech_stack_section_slider', {
	type: 'slider',
	perView: 4,
	animationDuration: 500,
	gap: 10,
	breakpoints: {
		449: {
			perView: 1
		},

		705: {
			perView: 2,
		},
		1024: {
			perView: 3
		}
	}
});

const portfolio_glide = new Glide('#portfolio_slider', {
	type: 'slider',
	perView: 1,
	animationDuration: 300
});

tech_section_glide.mount();
portfolio_glide.mount();
