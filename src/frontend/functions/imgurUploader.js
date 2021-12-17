//? Only shows info in console
function reportInfo(vars, showType = false) {
  if (showType === true) console.log(typeof vars);
  console.log(vars);
}

var feedback = function (res) {
  reportInfo(res, true);
  if (res.success === true) {
    var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
    console.log(get_link);
  }
};

new Imgur({
  clientId: '9516b72594d77fc', //You can change this ClientID
  callback: feedback,
});
