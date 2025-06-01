     // Banner Slider Functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function changeSlide(direction) {
            currentSlideIndex += direction;
            
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            } else if (currentSlideIndex < 0) {
                currentSlideIndex = slides.length - 1;
            }
            
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index - 1;
            showSlide(currentSlideIndex);
        }

        // Auto slide functionality
        setInterval(() => {
            changeSlide(1);
        }, 5000);

        // Explore Categories Slider
        let exploreCurrentIndex = 0;
        const exploreTrack = document.getElementById('exploreTrack');
        const exploreCards = document.querySelectorAll('.explore-card');
        const cardWidth = 330; // 300px width + 30px gap

        function slideExplore(direction) {
            const maxIndex = exploreCards.length - 3; // Show 3 cards at a time

            exploreCurrentIndex += direction;

            if (exploreCurrentIndex > maxIndex) {
                exploreCurrentIndex = 0;
            } else if (exploreCurrentIndex < 0) {
                exploreCurrentIndex = maxIndex;
            }

            const translateX = -exploreCurrentIndex * cardWidth;
            exploreTrack.style.transform = `translateX(${translateX}px)`;
        }

        // Auto slide for explore categories
        setInterval(() => {
            slideExplore(1);
        }, 4000);

        // Contact Form Functionality
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Reset form
            this.reset();
            
            // Hide success message after 4 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 4000);
            
            // Log form data (in real app, this would be sent to server)
            console.log('Contact form submitted:', { name, email, phone, message });
        });

        // FAQ Functionality
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Logo click to scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Mobile menu toggle (basic functionality)
        function toggleMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
            
            // Close mega menu when mobile menu is toggled
            const megaMenu = document.getElementById('megaMenu');
            megaMenu.classList.remove('show');
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            const animateElements = document.querySelectorAll('.service-card, .explore-card, .addon-card, .featured-card, .faq-item');
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });

        // Add recent bookings functionality (placeholder)
        function showRecentBookings() {
            alert('Recent bookings section would display here with vintage event showcases');
        }

        // Add hover sound effects (optional enhancement)
        document.querySelectorAll('.service-card, .explore-card, .addon-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Subtle hover effect enhancement
                this.style.filter = 'brightness(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(1)';
            });
        });

        // Recent searches functionality
        const MAX_RECENT_SEARCHES = 5;
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        const searchBar = document.querySelector('.search-bar');
        const recentSearchesContainer = document.getElementById('recentSearches');

        function addToRecentSearches(searchTerm) {
            if (searchTerm.trim() && searchTerm.length > 2) {
                recentSearches = recentSearches.filter(term => term !== searchTerm);
                recentSearches.unshift(searchTerm);
                if (recentSearches.length > MAX_RECENT_SEARCHES) {
                    recentSearches.pop();
                }
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            }
        }

        function showRecentSearches() {
            if (recentSearches.length === 0) {
                recentSearchesContainer.style.display = 'none';
                return;
            }

            const recentSearchesHTML = recentSearches.map(term => 
                `<div class="recent-search-item" onclick="useRecentSearch('${term}')">${term}</div>`
            ).join('');

            recentSearchesContainer.innerHTML = `
                ${recentSearchesHTML}
                <div class="clear-searches" onclick="clearRecentSearches()">Clear Recent Searches</div>
            `;
            recentSearchesContainer.classList.add('show');
        }

        function useRecentSearch(term) {
            searchBar.value = term;
            searchEvents();
            recentSearchesContainer.classList.remove('show');
        }

        function clearRecentSearches() {
            recentSearches = [];
            localStorage.removeItem('recentSearches');
            recentSearchesContainer.classList.remove('show');
        }

        // Modify the existing searchEvents function
        function searchEvents() {
            const searchValue = searchBar.value.toLowerCase();
            const eventElements = document.querySelectorAll('.service-card, .explore-card');
            
            if (searchValue.trim()) {
                addToRecentSearches(searchValue);
            }
            
            eventElements.forEach(element => {
                const title = element.querySelector('h3').textContent.toLowerCase();
                const description = element.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchValue) || description.includes(searchValue)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        }

        // Event listeners for search functionality
        searchBar.addEventListener('focus', showRecentSearches);

        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && !recentSearchesContainer.contains(e.target)) {
                recentSearchesContainer.classList.remove('show');
            }
        });

        // Cart functionality
        let cartCount = 0;
        const cartCountElement = document.querySelector('.cart-count');
        
        function updateCart(count) {
            cartCount += count;
            cartCountElement.textContent = cartCount;
        }

        function toggleMegaMenu() {
            const megaMenu = document.getElementById('megaMenu');
            megaMenu.classList.toggle('show');
        }
        
        // Close mega menu when clicking outside
        document.addEventListener('click', (e) => {
            const megaMenu = document.getElementById('megaMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (!megaMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                megaMenu.classList.remove('show');
            }
        });
    