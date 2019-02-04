const profile = {
  name: "Darshan Baral",
  link: "https://www.darshanbaral.com",
  projects: {
    dna: {
      link: "https://darshanbaral.github.io/dna/",
      description: "A tool to manipulate dna sequences"
    },
    callbreak: {
      link: "https://darshanbaral.github.io/callbreak/",
      description: "A tool to record socres during a game of Callbreak"
    },
    sada: {
      link: "https://themes.gohugo.io/sada/",
      description: "A simple gohugo theme made using Bootstrap 4"
    }
  }
};

$(document).ready(function() {
  let heading = `<h1 class="text-center mt-4" id="heading"><a target="_blank" href="${
    profile.link
  }">${profile.name}</a></h1>`;

  $("#app").append(heading);

  let myProjects = `<ul id="portFolio"></ul>`;
  $("#heading").after(myProjects);

  for (let key in profile.projects) {
    let projectItems = `<li>
        <a href="${profile.projects[key].link}">${key}</a>: ${
      profile.projects[key].description
    }
      </li>`;
    console.log(myProjects);
    $("#portFolio").append(projectItems);
  }
});
