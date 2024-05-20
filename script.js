



function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= ( (window.innerHeight || document.documentElement.clientHeight) * 0.4)
  );
}

function checkVisibility(target , navigator , upper_tag_nav , lower_tag_nav) {
  
  if (isElementInViewport(target)) {
    if(!navigator.classList.contains('navigation-bar-selected')){
      navigator.classList.add("navigation-bar-selected");

      if (upper_tag_nav !== null){
        if(upper_tag_nav.classList.contains('navigation-bar-selected')){
          upper_tag_nav.classList.remove("navigation-bar-selected");
        }
      }

      if (lower_tag_nav !== null){
        if(lower_tag_nav.classList.contains('navigation-bar-selected')){
          lower_tag_nav.classList.remove("navigation-bar-selected");
        }
      }

    }
  } else {
    if(navigator.classList.contains('navigation-bar-selected')){
      navigator.classList.remove("navigation-bar-selected");
    }
  }


}


function hasTouchSupport() {
  // Use to check if not in the pc
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function visitProject(url){
  window.open(url, '_blank');
};


function project_effect_in_phone(){
  const projects = document.querySelectorAll('.project');
  projects.forEach(project =>{
    let project_button = project.getElementsByTagName("button")[0];
    project_button.style.opacity = '1';

    
  });
}

function project_effect_in_pc(){
  const projects = document.querySelectorAll('.project');
  projects.forEach(project =>{
    
    // When Hovered in pc
    project.addEventListener('mouseenter' , () =>{
      let project_button = project.getElementsByTagName("button")[0];
      project_button.style.opacity = '1';
      project_button.addEventListener( 'click' , ()=>{
        visitProject(project_button.getAttribute('project-url'));
      })

    });

    // When Not Hovered in pc
    project.addEventListener('mouseleave' , () =>{
      let project_button = project.getElementsByTagName("button")[0];
      project_button.style.opacity = '0';
      project_button.addEventListener( 'click' , ()=>{
        visitProject(project_button.getAttribute('project-url'));
      })

    });
  });
};

function navigation_in_pc(){

    

  const introductioncontainer = document.getElementById('introduction-div');
  const navintroduction = document.getElementById("nav-introduction");
  const skilllistcontainer = document.getElementById('skills-div');
  const navskills = document.getElementById("nav-skills");
  const projectlistcontainer = document.getElementById('projects-div');
  const navprojects = document.getElementById("nav-projects");
  const qualificationlistcontainer = document.getElementById('qualification-div');
  const navqualifications = document.getElementById("nav-qualifications");

  checkVisibility(introductioncontainer, navintroduction  , null , navskills );
  checkVisibility(skilllistcontainer, navskills, navintroduction,  navprojects);
  checkVisibility(projectlistcontainer, navprojects , navskills, navqualifications );
  checkVisibility(qualificationlistcontainer , navqualifications, navprojects, null);
}

function contacts_accounts_visiting(){
  const accounts = document.getElementsByClassName('accounts')[0].getElementsByTagName('li');
  console.log(accounts);
  for( let i=0; i < accounts.length; i++){
    accounts[i].addEventListener('click', ()=>{
      visitProject(accounts[i].getAttribute('account-url'));
    })
  }

  const gmail = document.getElementsByClassName('main-contact')[0].getElementsByTagName('li')[1];
  gmail.addEventListener('click', ()=>{
    visitProject(gmail.getAttribute('contact-url'));
  })

}


// Main Function
document.addEventListener('DOMContentLoaded', function() {

  contacts_accounts_visiting()

  if( hasTouchSupport()){
    project_effect_in_phone();
  } else {
    project_effect_in_pc();
    
    setInterval(navigation_in_pc, 1000/30);
  }


});


