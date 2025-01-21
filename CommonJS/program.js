// document.addEventListener('DOMContentLoaded', () => {
//     const filterImages = document.querySelectorAll('.styles_filterTypes__rgtjl img');
//     const backButton = document.querySelector('.styles_backBtn__R1tTa');
//     const filterDiv = document.querySelector('.styles_filtersDesktop__Ejkci');
//     const programsContainer = document.querySelector('.styles_programsContainer__MSZLc');

//     if (filterImages.length && filterDiv && programsContainer) {
//         // Add event listeners to all filter icons
//         filterImages.forEach(image => {
//             image.addEventListener('click', () => {
//                 // Show the filter container and hide icons
//                 filterDiv.classList.remove('hidden-filter');
//                 programsContainer.classList.add('icons-hidden');
//             });
//         });

//         // Add event listener to the back button to close filters
//         if (backButton) {
//             backButton.addEventListener('click', () => {
//                 // Hide the filter container and show icons
//                 filterDiv.classList.add('hidden-filter');
//                 programsContainer.classList.remove('icons-hidden');
//             });
//         }
//     } else {
//         console.warn('Some elements are missing in the DOM.');
//     }

//     // Hide elements with the class `.icon-class`
//     document.querySelectorAll('.icon-class').forEach(icon => {
//         icon.style.display = 'none';
//     });
// });
// document.querySelector('.styles_filterLogo__IUuM3').addEventListener('click', function() {
//     const filterSection = document.querySelector('.styles_filtersDesktop__Ejkci');
//     filterSection.classList.toggle('active');
// });


document.addEventListener('DOMContentLoaded', () => {
    const filterImages = document.querySelectorAll('.styles_filterTypes__rgtjl img');
    const backButton = document.querySelector('.styles_backBtn__R1tTa');
    const filterDiv = document.querySelector('.styles_filtersDesktop__Ejkci');
    const programsContainer = document.querySelector('.styles_programsContainer__MSZLc');
    const filterIcon = document.querySelector(".styles_filtersLogo__XnFjk");
    const filterItems = document.querySelector(".flex.items-center.relative.mb-2");

    if (filterImages.length && filterDiv && programsContainer) {
        // Add event listeners to all filter icons
        filterImages.forEach(image => {
            image.addEventListener('click', () => {
                filterDiv.classList.remove('hidden-filter');
                programsContainer.classList.add('icons-hidden');
            });
        });

        // Add event listener to the back button
        if (backButton) {
            backButton.addEventListener('click', () => {
                filterDiv.classList.add('hidden-filter');
                programsContainer.classList.remove('icons-hidden');
            });
        }
    } else {
        console.warn('Some elements are missing in the DOM.');
    }

    // Toggle filter visibility when filter icon is clicked
    if (filterIcon && filterDiv) {
        filterIcon.addEventListener('click', () => {
            filterDiv.classList.toggle('hidden-filter');
        });
    }

    // Hide filter section when filter items are clicked
    if (filterItems && filterDiv) {
        filterItems.addEventListener('click', () => {
            filterDiv.classList.add('hidden-filter');
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const filterIcon = document.querySelector(".styles_filtersLogo__XnFjk");
    const backButton = document.querySelector(".styles_backBtn__R1tTa");
    const filterSection = document.querySelector(".styles_filtersDesktop__Ejkci");
    const programsContainer = document.querySelector(".styles_programsContainer__MSZLc");

    // Toggle filter section visibility when the filter icon is clicked
    filterIcon.addEventListener("click", function () {
        console.log("Filter Icon Clicked");

        // Toggle visibility of the filter section
        if (filterSection.style.display === "none" || filterSection.style.display === "") {
            filterSection.style.display = "block"; // Show filter section
        } else {
            filterSection.style.display = "none";  // Hide filter section
        }

        
    });

    // Hide filter section and show programs container when the back button is clicked
    backButton.addEventListener("click", function () {
        console.log("Back Button Clicked");

        // Hide filter section
        filterSection.style.display = "none";

        // Show programs container
        // programsContainer.style.display = "block";
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const filterIcon = document.querySelector(".styles_filtersLogo__XnFjk");
//     const filterSection = document.querySelector(".styles_filtersDesktop__Ejkci");
//     const filterItems = document.querySelector(".flex.items-center.relative.mb-2");

//     // Toggle filter section visibility when the filter icon is clicked
//     filterIcon.addEventListener("click", function () {
//         filterSection.classList.toggle("hidden-filter");
//     });

//     // Hide filter section when flex item is clicked
//     filterItems.addEventListener("click", function () {
//         filterSection.classList.add("hidden-filter");
//     });
// });