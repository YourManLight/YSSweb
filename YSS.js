
let renderer, scene, camera, galaxy, centralLight;
let zoomSpeed = 0.2;
let isLocked = false;
let isFovLocked = false;
let centerView = { x: 1, y: 1, z: 200 };
let offsetRightView = { x: 500, y: 0, z: 300 };
let offsetLightView = { x: 1000, y: 1, z: 10 };
let offsetLeftView = { x: -800, y: 0, z: 300 };
let offsetdefView = { x: 0, y: -205, z: 300 };
let offsetdownView = { x: 0, y: -1000, z: 300 };
let typingInterval;
let mayan;
let isTyping = false;
let yssLogo;


const homeButton = document.getElementById('homeBtn');
const otherButtons = document.querySelectorAll('#downloadBtn, #aboutBtn, #discordBtn, #shaderBtn');

function toggleButtonsVisibility(showOthers) {
    otherButtons.forEach(button => {
        button.style.display = showOthers ? 'block' : 'none';
    });
    homeButton.style.display = showOthers ? 'none' : 'block';
}



window.addEventListener('load', function () {
    var loadingScreen = document.querySelector('.loading');
    var content = document.getElementById('content');


    loadingScreen.style.display = 'none';


    content.style.display = 'block';
});


function init() {

    let next = document.querySelector('.next')
    let prev = document.querySelector('.prev')

    next.addEventListener('click', function () {
        let items = document.querySelectorAll('.item')
        document.querySelector('.slide').appendChild(items[0])
    })

    prev.addEventListener('click', function () {
        let items = document.querySelectorAll('.item')
        document.querySelector('.slide').prepend(items[items.length - 1])
    })


    imageContainer4.classList.add('hidden');
    document.getElementById('imageContainer6').classList.remove('hidden');



    document.getElementById('Release').style.display = 'none';
    document.getElementById('BETA').style.display = 'none';
    document.getElementById('MUSIC').style.display = 'none';

    document.getElementById('YSSHALBtn').style.display = 'none';
    document.getElementById('YSSRDBtn').style.display = 'none';
    document.getElementById('YSSSEBtn').style.display = 'none';


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.getElementById('canvas').appendChild(renderer.domElement);

    scene = new THREE.Scene();
    mayan = document.getElementById('mayanElement');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 300);
    scene.add(camera);

    galaxy = new THREE.Group();
    scene.add(galaxy);

    generateGalaxy();

    centralLight = new THREE.PointLight(0xFF0000, 5, 1000);
    centralLight.position.set(0, 0, 300);
    scene.add(centralLight);

    createTwinklingStars();
    createYSSLogo();

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('wheel', onDocumentMouseWheel);
    animate();
    animateTwinklingStars();



    //    
    // const gui = new dat.GUI();
    // const cameraFolder = gui.addFolder('Camera Position');
    // cameraFolder.add(camera.position, 'x', -1000, 1000);
    // cameraFolder.add(camera.position, 'y', -1000, 1000);
    // cameraFolder.add(camera.position, 'z', -1000, 1000);
    // cameraFolder.open();
    //////////////////download btn ///////////////

    document.getElementById('downloadBtn').addEventListener('click', () => {
        if (!isLocked) {


            isLocked = true;
            showHomeButton();
            switchToOffsetView(offsetRightView);
            isLocked = true;

            setTimeout(() => {
            }, 450);
            lockFovAndCursor();
            toggleButtonsVisibility(false);
            toggleScrollWheelZoom(true);


            document.getElementById('imageTextContainer3').classList.remove('hidden');
            document.getElementById('imageTextContainer3').classList.remove('hidden');

            document.getElementById('BetterRD').style.display = 'block';
            document.getElementById('PatchAPP').style.display = 'block';
            document.getElementById('IOS').style.display = 'block';
            document.getElementById('ShaderLoader').style.display = 'block';

            document.getElementById('imageContainer4').classList.remove('hidden');

        }
    });

    ////////////////////////////////discord////////////////////




    document.getElementById('discordBtn').addEventListener('click', () => {


        window.location.href = 'https://discord.gg/yss';

        hideHomeButton();
        const mouseX = 0;
        const mouseY = 0;

        camera.position.x = mouseX;
        camera.position.y = mouseY;
        camera.lookAt(scene.position);

        camera.updateProjectionMatrix();
        setTimeout(resetViewToCenter, 0);


    });





    ///////////////////////////////////shaderbtn///////////////////////////////

    document.getElementById('shaderBtn').addEventListener('click', () => {
        if (!isLocked) {

            document.getElementById('YSSHALBtn').style.display = 'block';
            document.getElementById('YSSRDBtn').style.display = 'block';
            document.getElementById('YSSSEBtn').style.display = 'block';

            isLocked = true;
            showHomeButton();
            switchToOffsetView(offsetdownView);
            toggleButtonsVisibility(false);
            lockFovAndCursor();

            toggleScrollWheelZoom(true);

            var container = document.querySelector('.container');
            container.style.display = 'block';
            var imageContainer5 = document.querySelector('.imageContainer5');
            imageContainer5.style.display = 'none';
            var buttons4patch = document.querySelector('.buttons4patch');
            buttons4patch.style.display = 'none';



            document.querySelector('.buttons4patch').style.display = 'none';
            document.querySelector('.imageContainer5').style.display = 'none';
            document.querySelector('.container').style.display = 'block';



        }
    });

    ////download link fo shaders/////
    document.getElementById('YSSHALBtn').addEventListener('click', () => {
        window.open('./Download/Shaders/YSSHAL/YSSBEv1.17.1_EX.mcpack', '_blank');
    });

    document.getElementById('YSSRDBtn').addEventListener('click', () => {
        window.open('./Download/Shaders/YSSRD/YSS_RD_1.9.10_Beta2.mcpack', '_blank');
    });


    document.getElementById('YSSSEBtn').addEventListener('click', () => {
        var modal = document.getElementById('platformModal');
        modal.style.display = 'block';
    });


    var modal = document.getElementById('platformModal');


    var span = document.getElementsByClassName('close')[0];


    span.onclick = function () {
        modal.style.display = 'none';
    }


    document.getElementById('androidBtn').addEventListener('click', () => {
        window.open('./Download/Shaders/YSSSE/Android/YSS_SE_1.9.8.0_Android.mcpack', '_blank');
        modal.style.display = 'none';
    });


    document.getElementById('windowsBtn').addEventListener('click', () => {
        window.open('./Download/Shaders/YSSSE/Windows/YSS_SE_1.9.8.0_Windows.mcpack', '_blank');
        modal.style.display = 'none';
    });


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }




    // Function to animate ender2.png
    function animateEnder2(numIterations, intervalDelay) {
        let iterations = 0;


        const animate = () => {

            if (iterations >= numIterations) {
                clearInterval(animationInterval);
                return;
            }


            const numImages = 12;
            const imageWidth = 100;


            for (let i = 0; i < numImages; i++) {
                const ender2 = document.createElement('img');
                ender2.src = 'Assests/Extra/ender2.png';
                ender2.className = 'pop-up-throw';
                document.body.appendChild(ender2);


                const randomX = Math.random() * (window.innerWidth - imageWidth);
                const randomY = window.innerHeight + Math.random() * 200;

                ender2.style.left = randomX + 'px';
                ender2.style.top = randomY + 'px';


                const rotation = Math.random() * 360 - 180;
                const scale = Math.random() * 0.8 + 0.6;
                const delay = Math.random() * 2;

                ender2.style.transform = `rotate(${rotation}deg) scale(${scale})`;
                ender2.style.opacity = '0';


                setTimeout(() => {
                    ender2.style.transition = 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-out';
                    ender2.style.transform = `translateY(-150vh) rotate(${rotation + 360}deg) scale(${scale * 0.5})`;
                    ender2.style.opacity = '1';
                }, delay * 1000);


                ender2.addEventListener('transitionend', () => {
                    ender2.remove();
                });
            }

            iterations++;
        };


        animate();


        const animationInterval = setInterval(animate, intervalDelay);
    }


    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitButton');
    const passwordForm = document.getElementById('imageContainer7');
    const imageContainer = document.getElementById('imageContainer6');
    const body = document.body;


    const correctPassword = 'endermanyk';


    function toggleContainers() {
        passwordForm.classList.toggle('hidden');
        imageContainer.classList.toggle('hidden');
    }



    submitButton.addEventListener('click', function () {
        const enteredPassword = passwordInput.value.trim();


        if (enteredPassword === correctPassword) {

            animateEnder2(5, 80);

            toggleContainers();

            passwordInput.value = '';
        } else {

        }
    });




    ////////////////////////////// Home btn//////////////////////////////


    document.getElementById('homeBtn').addEventListener('click', () => {



        document.getElementById('imageTextContainer3').classList.add('hidden');

        document.getElementById('imageContainer4').classList.add('hidden');

        document.getElementById('imageContainer6').classList.add('hidden');
        document.getElementById('imageContainer6').style.display = 'none';


        document.querySelector('.button-container').style.display = 'none';
        document.querySelector('.button-container2').style.display = 'none';
        document.querySelector('.button-container3').style.display = 'none';



        logoImage.style.display = 'none';
        releaseImage.style.display = 'none';
        betaImage.style.display = 'none';
        musicImage.style.display = 'none';



        document.getElementById('BetterRD').style.display = 'none';
        document.getElementById('PatchAPP').style.display = 'none';
        document.getElementById('IOS').style.display = 'none';
        document.getElementById('ShaderLoader').style.display = 'none';




        document.getElementById('YSSHALBtn').style.display = 'none';
        document.getElementById('YSSRDBtn').style.display = 'none';
        document.getElementById('YSSSEBtn').style.display = 'none';


        document.getElementById('Release').style.display = 'none';
        document.getElementById('BETA').style.display = 'none';
        document.getElementById('MUSIC').style.display = 'none';



        var container100 = document.querySelector('.container');
        container100.style.display = 'none';



        hideHomeButton();
        toggleButtonsVisibility(true);
        toggleScrollWheelZoom(false);
        const mouseX = 0;
        const mouseY = 0;

        camera.position.x = mouseX;
        camera.position.y = mouseY;
        camera.lookAt(scene.position);

        camera.updateProjectionMatrix();
        setTimeout(resetViewToCenter, 0);

    });
}

function animateImageIntro(imageElement) {
    gsap.from(imageElement, { opacity: 0, duration: 1, ease: 'power2.inOut' });

}


/////////////////////////////about btn ///////////////////////////////

document.getElementById('aboutBtn').addEventListener('click', () => {



    if (!isLocked) {


        isLocked = true;
        showHomeButton();
        switchToOffsetView(offsetLeftView);
        isLocked = true;

        setTimeout(() => {
        }, 450);
        lockFovAndCursor();
        toggleButtonsVisibility(false);
        toggleScrollWheelZoom(true);

        document.getElementById('imageContainer6').classList.remove('hidden');
        document.getElementById('imageContainer6').style.display = 'block';



    }


});


function switchToOffsetView(view, callback) {
    gsap.to(camera.position, {
        x: view.x,
        y: view.y,
        z: view.z,
        duration: 0.5,
        onComplete: callback
    });
}




function resetViewToCenter() {
    gsap.to(camera.position, { x: 0, y: 0, z: 200, duration: 0.2 });
    isLocked = false;
    isFovLocked = false;
    document.addEventListener('mousemove', onDocumentMouseMove);
    function setFOV(value) {
        camera.fov = 34;
        camera.updateProjectionMatrix();
    }

    setFOV(130);
}





function toggleScrollWheelZoom(enableZoom) {
    if (enableZoom) {
        document.removeEventListener('wheel', onDocumentMouseWheel);
    } else {
        document.addEventListener('wheel', onDocumentMouseWheel);
    }
}






function switchToOffsetView(view) {
    gsap.to(camera.position, { x: view.x, y: view.y, z: view.z, duration: 0.5 });
}





function resetView() {
    gsap.to(camera.position, { x: 5, y: 0, z: 300, duration: 0.5 });
    isLocked = false;
}





function lockFovAndCursor() {
    isFovLocked = true;
    document.removeEventListener('mousemove', onDocumentMouseMove);
}


function unlockFovAndCursor() {
    isFovLocked = false;
    document.addEventListener('mousemove', onDocumentMouseMove);
}



function generateGalaxy() {
    const starGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    for (let i = 0; i < 5000; i++) {
        const distance = Math.random() * 2000;
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        starMesh.position.set(
            Math.random() * distance - distance / 2,
            Math.random() * distance - distance / 2,
            Math.random() * distance - distance / 2
        );
        galaxy.add(starMesh);
    }
}



function shiftViewRight() {
    if (!isLocked) {
        gsap.to(camera.position, { x: 500, duration: 0.5 });
        isLocked = true;
    }
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    const mouseX = (event.clientX - window.innerWidth / 2) / 2;
    const mouseY = (event.clientY - window.innerHeight / 2) / 2;

    camera.position.x = mouseX;
    camera.position.y = -mouseY;
    camera.lookAt(scene.position);
}

function onDocumentMouseWheel(event) {
    const delta = event.deltaY;

    const fov = camera.fov + delta * zoomSpeed;
    camera.fov = THREE.MathUtils.clamp(fov, 24, 130);
    camera.updateProjectionMatrix();
}

document.querySelectorAll('#buttons button').forEach(button => {
    button.addEventListener('click', () => {
        if (!isLocked) {
            // shiftViewRight();
            showHomeButton();
        }
    });
});




function shiftViewRight() {
    gsap.to(camera.position, { x: "+=20", duration: 0.5 });
}

function lockViewToCenter() {
    gsap.to(camera.position, { x: 0, duration: 0.5 });
    isLocked = true;
}

function showHomeButton() {
    const homeBtn = document.getElementById('homeBtn');
    homeBtn.style.display = 'inline-block';
}

function hideHomeButton() {
    const homeBtn = document.getElementById('homeBtn');
    homeBtn.style.display = 'none';
    isLocked = false;
}

function createTwinklingStars() {
    const starField = new THREE.Group();

    const starGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    const distanceRange = 1000;

    for (let i = 0; i < 500; i++) {
        const position = new THREE.Vector3(
            Math.random() * distanceRange - distanceRange / 2,
            Math.random() * distanceRange - distanceRange / 2,
            Math.random() * distanceRange - distanceRange / 2
        );
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        starMesh.position.copy(position);
        starField.add(starMesh);
    }

    scene.add(starField);
}




document.addEventListener('DOMContentLoaded', function () {
    const fireAnimationContainer = document.getElementById('imageContainer4');
    const shaderLoaderBtn = document.getElementById('ShaderLoader');

    shaderLoaderBtn.addEventListener('click', function () {
        createFireAnimation();
    });

    function createFireAnimation() {

        for (let i = 0; i < 10; i++) {
            const smallFireImage = document.createElement('img');
            smallFireImage.src = 'Assests/Extra/firesmall.png';
            smallFireImage.classList.add('small-fire-image');
            smallFireImage.style.left = `${Math.random() * 100}%`;
            smallFireImage.style.top = `${Math.random() * 100}%`;
            smallFireImage.style.animationDelay = `${Math.random() * 1.5}s`;
            fireAnimationContainer.appendChild(smallFireImage);

            smallFireImage.addEventListener('animationend', function () {
                fireAnimationContainer.removeChild(smallFireImage);
            });
        }
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const betterRdBtn = document.getElementById('BetterRD');
    betterRdBtn.addEventListener('click', function () {
        window.location.href = 'https://github.com/ddf8196/BetterRenderDragon/releases';
    });
});





document.addEventListener('DOMContentLoaded', function () {




    const container6 = document.querySelector('.button-container');
    const container7 = document.querySelector('.button-container2');
    const container8 = document.querySelector('.button-container3');

    function hideAllVersionContainers() {
        container6.style.display = 'none';
        container7.style.display = 'none';
        container8.style.display = 'none';
    }



    const patchAppBtn = document.getElementById('PatchAPP');
    const releaseBtn = document.getElementById('Release');
    const betaBtn = document.getElementById('BETA');
    const musicBtn = document.getElementById('MUSIC');
    const homeBtn = document.getElementById('homeBtn');


    const logoImage = document.getElementById('logoImage');
    const releaseImage = document.getElementById('releaseImage');
    const betaImage = document.getElementById('betaImage');
    const musicImage = document.getElementById('musicImage');


    function hideAllImages() {
        logoImage.style.display = 'none';
        releaseImage.style.display = 'none';
        betaImage.style.display = 'none';
        musicImage.style.display = 'none';
    }


    logoImage.style.display = 'none';

    const PatchAPP = document.getElementById('PatchAPP');

    PatchAPP.addEventListener('click', function () {

        switchToOffsetView(offsetLightView);

        document.getElementById('imageTextContainer3').classList.add('hidden');

        document.getElementById('imageContainer4').classList.add('hidden');



        document.querySelector('.button-container').style.display = 'none';
        document.querySelector('.button-container2').style.display = 'none';
        document.querySelector('.button-container3').style.display = 'none';



        document.getElementById('BetterRD').style.display = 'none';
        document.getElementById('PatchAPP').style.display = 'none';
        document.getElementById('IOS').style.display = 'none';
        document.getElementById('ShaderLoader').style.display = 'none';





        document.getElementById('Release').style.display = 'Block';
        document.getElementById('BETA').style.display = 'Block';
        document.getElementById('MUSIC').style.display = 'block';
        document.getElementById('homeBtn').style.display = 'block';





        hideAllImages();
        hideAllVersionContainers();
        logoImage.style.display = 'block';



    });


    releaseBtn.addEventListener('click', function () {

        hideAllImages();
        releaseImage.style.display = 'block';
        hideAllVersionContainers();
        container6.style.display = 'block';
    });

    betaBtn.addEventListener('click', function () {

        hideAllImages();
        betaImage.style.display = 'block';
        hideAllVersionContainers();
        container7.style.display = 'block';
    });

    musicBtn.addEventListener('click', function () {

        hideAllImages();
        musicImage.style.display = 'block';
        hideAllVersionContainers();
        container8.style.display = 'block';
    });



});




function createYSSLogo() {
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('Assests/Extra/yssLogo.png');
    const logoMaterial = new THREE.SpriteMaterial({ map: logoTexture });

    const logoSprite = new THREE.Sprite(logoMaterial);
    logoSprite.scale.set(50, 50, 1);
    logoSprite.name = 'yssLogo';
    scene.add(logoSprite);

    const buttons = ['downloadBtn', 'aboutBtn', 'discordBtn', 'shaderBtn'];

    buttons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('mouseenter', () => {
            zoomIn(60);
            increaseStarColor();
        });
        button.addEventListener('mouseleave', () => {
            zoomIn(50);
            resetStarColor();
        });
    });

    function zoomIn(targetZoom) {
        gsap.to(camera, { fov: targetZoom, duration: 0.5, onUpdate: () => camera.updateProjectionMatrix() });
    }


}

function lockFOV() {
    isFovLocked = true;
    document.removeEventListener('mousemove', onDocumentMouseMove);
}

function unlockFOV() {
    isFovLocked = false;
    document.addEventListener('mousemove', onDocumentMouseMove);
}


function increaseStarColor() {


    const starField = scene.children.find(child => child.type === 'Group');
    if (starField) {
        starField.children.forEach(star => {
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            gsap.to(star.material.color, {
                r: parseInt(randomColor.substr(1, 2), 16) / 255,
                g: parseInt(randomColor.substr(3, 2), 16) / 255,
                b: parseInt(randomColor.substr(5, 2), 16) / 255,
                duration: 0.5
            });
        });
    }
}

function resetStarColor() {
    const starField = scene.children.find(child => child.type === 'Group');
    if (starField) {
        starField.children.forEach(star => {
            gsap.to(star.material.color, {
                r: 1,
                g: 1,
                b: 1,
                duration: 0.5
            });
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    galaxy.rotation.y += 0.0001;
    renderer.render(scene, camera);
    //  setInterval(displayDebugInfo, 100);
}

function animateTwinklingStars() {
    const starField = scene.children.find(child => child.type === 'Group');
    if (starField) {
        starField.children.forEach(star => {
            const scale = Math.random() * 0.4 + 0.6;
            gsap.to(star.scale, Math.random() * 1 + 1, {
                x: scale,
                y: scale,
                z: scale,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
    }
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {

        const homeBtn = document.getElementById('homeBtn');
        if (homeBtn) {
            homeBtn.click();
        }
    }
});
//    function displayDebugInfo() {
//     document.getElementById('cameraPosition').innerText = `X: ${camera.position.x.toFixed(2)}, Y: ${camera.position.y.toFixed(2)}, Z: ${camera.position.z.toFixed(2)}`;
//     document.getElementById('isLocked').innerText = isLocked.toString();
//     document.getElementById('isFovLocked').innerText = isFovLocked.toString();
// }


window.onload = function () {
    init();
};


