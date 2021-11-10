const api_url = "";

async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  if (response) {
    hideloader();
  }
  show(data);
}
getapi(api_url);

function hideloader() {
  document.getElementById('loading').style.display = 'none';
}


function show(data) {
  let tab =
    `<tr>
          <th style="padding: 20px">Book ID</th>
          <th style="padding: 20px">Title</th>
          <th style="padding: 20px">Author</th>
          <th style="padding: 20px">No of Pages</th>
          <th style="padding: 20px">Category</th>
         </tr>`;
  for (let r of data) {
    tab += `<tr> 
    <td>${r.book_id} </td>
    <td>${r.title}</td>
    <td>${r.author}</td>
    <td>${r.pages}</td>
    <td>${r.category}</td>
</tr>`;
  }
  document.getElementById("employees").innerHTML = tab;
}