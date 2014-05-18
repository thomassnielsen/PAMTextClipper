var minimumCharacterCount = 60;
var paragraphTexts = [];

var paragraphs = [];

function paragraphWithText(text)
{
  var paragraph = document.createElement('p');
  paragraph.innerHTML = text;
  paragraph.style.color = "#FFF";
  paragraph.style.padding = "20px";
  paragraph.style.maxWidth = "35em";
  paragraph.style.margin = "auto";
  paragraph.style.marginTop = "10px";
  paragraph.style.fontFamily = "LatoLatinLight, LatoLatin, 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif";
  paragraph.style.fontSize = "18px";
  paragraph.style.lineHeight = "40px";
  paragraph.style.border = "1px solid white";
  paragraph.style.backgroundColor = "rgba(0,0,0,0.75)";
  paragraph.addEventListener("click", function(){
    var strippedString = this.innerHTML.replace(/<(?!br\s*\/?)[^>]+>/ig,"");
    // alert("Kopierte: " + strippedString);
    // window.location.href = 'pam://copyText?text='+paragraph.innerHTML;
    summaryElement = this.cloneNode(true);
    summaryElement.style.color = "#000";
    summaryElement.style.backgroundColor = "#fff";
    summaryElement.style.border = "";
    summaryElement.style.WebkitTransition = 'max-height 1s';
    // summaryElement.style.maxHeight = "0px";
    cancelButton = document.createElement('a');
    cancelButton.className = "PAMcancelButton"
    cancelButton.innerHTML = "X";
    cancelButton.addEventListener("click", function(){
      this.parentNode.parentNode.removeChild(this.parentNode);
    });
    cancelButton.style.cssText = "position:relative;right:-60px;height:30px;width:30px;top:0px;float:right;";
    summaryElement.insertBefore(cancelButton,summaryElement.firstChild);
    
    var summaryDiv = document.getElementById("summaryDiv")
    summaryDiv.appendChild(summaryElement);
    summaryDiv.scrollTop = summaryDiv.scrollHeight;


    window.getComputedStyle(summaryElement).height;
    summaryElement.style.maxHeight = "1000px";
  }, false);

  return paragraph;
}

var backgroundDiv = document.createElement('div');
backgroundDiv.id = "backgroundDiv";
backgroundDiv.style.cssText = 'position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:1000000;background:rgba(0,0,0,0.5);';
document.body.appendChild(backgroundDiv);

var overlayDiv = document.createElement('div');
overlayDiv.style.cssText = 'position:absolute;top:0px;left:0px;bottom:0px;right:0px;z-index:1000000;';
overlayDiv.id = "overlayDiv";

var summaryDiv = document.createElement('div');
summaryDiv.style.cssText = 'position:Fixed;bottom:0px;left:0px;right:0px;background-color:white;overflow-y:scroll;max-height:50%;';
summaryDiv.id = "summaryDiv";
overlayDiv.appendChild(summaryDiv);

function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}

function appendElement(element)
{
  string = element.nodeValue;
  var strippedString = string.replace(/<(?!br\s*\/?)[^>]+>/ig,"").replace(/ +(?= )/g,''); // Remove tags and extra spaces
  if (strippedString.length < minimumCharacterCount)
  {
    return;
  }

  if (arrayContains(strippedString, paragraphTexts))
    return;

  paragraphTexts.push(strippedString);

  paragraph = paragraphWithText(strippedString);
  overlayDiv.appendChild(paragraph);
}

function recurse(element)
{
  if (element.nodeName == "SCRIPT" || 
      element.nodeName == "STYLE" || 
      element.nodeName == "HEAD" || 
      element.nodeName == "IMG" || 
      element.nodeName == "BR" ||
      element.nodeName == "INPUT" ||
      element.nodeName == "#comment")
  {
    return false;
  }
    if (element.childNodes.length > 0)
        for (var i = 0; i < element.childNodes.length; i++) 
            recurse(element.childNodes[i]);

    if (element.nodeType == Node.TEXT_NODE && /\S/.test(element.nodeValue)) 
        appendElement(element);
}
var html = document.getElementsByTagName('html')[0];
recurse(html);

document.body.appendChild(overlayDiv);
window.scrollTo(0,0);

function summary()
{
  var clone = document.getElementById('summaryDiv').cloneNode(true);
  var innerHTML = clone.innerHTML.replace(/<a[^>]*>/g, '').replace(/X<\/a>/g, '\n\n'); // Removes delete-links
  var tmp = document.createElement("DIV");
   tmp.innerHTML = innerHTML;
   
   return tmp.textContent || tmp.innerText || "";
}