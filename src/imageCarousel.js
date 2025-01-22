export {imageCarousel}
import blankCircleIcon from "./icons/checkbox-blank-circle-outline.svg";
import filledCircleIcon from "./icons/checkbox-blank-circle.svg"

const imageCarousel = (function(){
    let currentPosition = 0;
    let bottomOffset = 0;
    //To know how much to adjust when going back
    let adjustedBottomOffset = 0;
    const imageSet = document.querySelector("#imageSet")
    const imagesNodeList = document.querySelectorAll(".carouselImages");
    const portrait = document.querySelector("#potrait")
    const navigationDotsDiv = document.querySelector("#navigationDotsDiv")

    //Setting the height of the potrait to the first image
    window.onload = () => {
        const noOfIcons = imagesNodeList.length;

        for(let i = 0; i < noOfIcons ;i++){
            const imageElement = document.createElement("img");
            imageElement.setAttribute("src",blankCircleIcon);
            imageElement.setAttribute("class","navigationDots");
            imageElement.setAttribute("id",`image${i}`)
            navigationDotsDiv.appendChild(imageElement);
        }

        const currentImageHeight = imagesNodeList[currentPosition].height;
        portrait.style.height = currentImageHeight+"px";
        addFilledDots(currentPosition)
    }
    setInterval(nextImage,5000)
    const nextButton = document.querySelector("#next")
    nextButton.addEventListener("click",nextImage)
    function nextImage(){
        //Change this no to the total no of items in the nodelist (zero indexed)
        //Resets the variables and goes back to the first image upon reaching the last one
        if(currentPosition === imagesNodeList.length-1){
            currentPosition = 0;
            bottomOffset = 0;

            portrait.style.height = imagesNodeList[currentPosition].clientHeight+"px"
            imageSet.style.bottom = bottomOffset+"px"
            addFilledDots(currentPosition)
            return
        }
        //to jump between images if needed
        jumpToImage(currentPosition)
        const currentImageHeight = imagesNodeList[currentPosition].clientHeight;
        const nextImageHeight = imagesNodeList[currentPosition+1].clientHeight
        portrait.style.height = nextImageHeight+"px";
        bottomOffset += currentImageHeight
        imageSet.style.bottom = bottomOffset+"px";

        addFilledDots(currentPosition+1)
        currentPosition++
        }
    
    const previousButton = document.querySelector("#previous")
    previousButton.addEventListener("click",previous)
    function previous(){
        if(currentPosition > 0){
            jumpToImage(currentPosition)
            const previousImageHeight = imagesNodeList[currentPosition-1].clientHeight;
            adjustedBottomOffset = bottomOffset - previousImageHeight;
            imageSet.style.bottom = adjustedBottomOffset+"px";
            portrait.style.height = previousImageHeight+"px";

            addFilledDots(currentPosition-1)
            currentPosition--
        }
        else{
            return
        }
    }

    //Not the function for the navigation dots
    function jumpToImage(index){
        const imagesArray = Array.from(imagesNodeList);
        const slicedArray = imagesArray.slice(0,index)
        bottomOffset = 0;
        //calculating the combined height to reach the said image
        slicedArray.forEach(function(item){
            bottomOffset += item.clientHeight;
        })
        imageSet.style.bottom = bottomOffset+"px";
        addFilledDots(currentPosition)

    }

    //Clicking the dots jumps to it's image
    navigationDotsDiv.addEventListener("click",navigationDotsFn)
    function navigationDotsFn(event){
        //clicking the dots will jump to that image
        const idOfElement = event.target.id;
        const imageNo = parseInt(idOfElement.slice(5,6));
        currentPosition = imageNo;
        jumpToImage(imageNo)
        portrait.style.height = imagesNodeList[currentPosition].clientHeight+"px"

    }

    function addFilledDots(index){
        const navigationDotsNodeList = document.querySelectorAll(".navigationDots")
        navigationDotsNodeList.forEach(function(item){
            item.setAttribute("src",blankCircleIcon)
        })
        const selectedImg = document.querySelector(`#image${index}`)
        selectedImg.setAttribute("src",filledCircleIcon)
    }

    



})()