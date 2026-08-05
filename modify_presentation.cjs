const fs = require('fs');
const file = './src/components/PresentationMode.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { Slide3, Slide4, Slide5, Slide6 } from './slides/CaseSlides1';",
  "import { Slide3, Slide4, Slide5, Slide6, SlideDorCrescimento } from './slides/CaseSlides1';"
);

content = content.replace("const totalSlides = 20;", "const totalSlides = 21;");

const oldMapping = `            {currentSlide === 0 && <Slide0 />}
            {currentSlide === 1 && <Slide1 />}
            {currentSlide === 2 && <Slide2 onNextSlide={() => goToSlide(3)} />}
            {currentSlide === 3 && <Slide3 />}
            {currentSlide === 4 && <Slide4 />}
            {currentSlide === 5 && <Slide5 />}
            {currentSlide === 6 && <Slide7 />}
            {currentSlide === 7 && <SlideDores />}
            {currentSlide === 8 && <Slide8 />}
            {currentSlide === 9 && <Slide6 />}
            {currentSlide === 10 && <Slide9 />}
            {currentSlide === 11 && <SlideDefinindoVersoes />}
            {currentSlide === 12 && <SlideGoogleAIStudio />}
            {currentSlide === 13 && <Slide10 />}
            {currentSlide === 14 && <SlideVideoCursor />}
            {currentSlide === 15 && <Slide11 />}
            {currentSlide === 16 && <Slide12 />}
            {currentSlide === 17 && <Slide13 />}
            {currentSlide === 18 && <Slide14 />}
            {currentSlide === 19 && <Slide15 />}`;

const newMapping = `            {currentSlide === 0 && <Slide0 />}
            {currentSlide === 1 && <Slide1 />}
            {currentSlide === 2 && <Slide2 onNextSlide={() => goToSlide(3)} />}
            {currentSlide === 3 && <Slide3 />}
            {currentSlide === 4 && <Slide4 />}
            {currentSlide === 5 && <SlideDorCrescimento />}
            {currentSlide === 6 && <Slide5 />}
            {currentSlide === 7 && <Slide7 />}
            {currentSlide === 8 && <SlideDores />}
            {currentSlide === 9 && <Slide8 />}
            {currentSlide === 10 && <Slide6 />}
            {currentSlide === 11 && <Slide9 />}
            {currentSlide === 12 && <SlideDefinindoVersoes />}
            {currentSlide === 13 && <SlideGoogleAIStudio />}
            {currentSlide === 14 && <Slide10 />}
            {currentSlide === 15 && <SlideVideoCursor />}
            {currentSlide === 16 && <Slide11 />}
            {currentSlide === 17 && <Slide12 />}
            {currentSlide === 18 && <Slide13 />}
            {currentSlide === 19 && <Slide14 />}
            {currentSlide === 20 && <Slide15 />}`;

content = content.replace(oldMapping, newMapping);
fs.writeFileSync(file, content, 'utf8');
console.log('Modified PresentationMode.tsx');
