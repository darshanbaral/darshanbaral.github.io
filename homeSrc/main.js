fetch(
  "https://raw.githubusercontent.com/darshanbaral/darshanbaral.github.io/master/homeSrc/dbData.json"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(profile) {
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
  });
