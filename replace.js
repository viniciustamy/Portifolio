const fs = require('fs');
let content = fs.readFileSync('src/components/PresentationMode.tsx', 'utf-8');
const startMatch = '{currentSlide === 0 && (';
const endMatch = '          </motion.div>\n        </AnimatePresence>\n      </main>';
const startIndex = content.indexOf(startMatch);
const endIndex = content.indexOf(endMatch);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find matches', startIndex, endIndex);
  process.exit(1);
}

const replacement = `            {currentSlide === 0 && <Slide0 />}
            {currentSlide === 1 && <Slide1 />}
            {currentSlide === 2 && <Slide2 />}
            {currentSlide === 3 && <Slide3 />}
            {currentSlide === 4 && <Slide4 />}
            {currentSlide === 5 && <Slide5 />}
            {currentSlide === 6 && <Slide6 />}
            {currentSlide === 7 && <Slide7 />}
            {currentSlide === 8 && <Slide8 />}
            {currentSlide === 9 && <Slide9 />}
            {currentSlide === 10 && <Slide10 />}
            {currentSlide === 11 && <Slide11 />}
            {currentSlide === 12 && <Slide12 />}
`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync('src/components/PresentationMode.tsx', newContent);
console.log('Replaced successfully');
