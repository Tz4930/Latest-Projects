// options.ts
export interface Option {
    value: string;
    label: string;
    imgSrc: string;
  }
  
  export const options: Option[] = [
    { value: 'square', label: 'Square', imgSrc: 'https://app.qr-code-generator.com/img/patterns/default.png  ' },
    { value: 'rounded', label: 'Rounded', imgSrc: 'https://app.qr-code-generator.com/img/patterns/rounded-2.png' },
    { value: 'dots', label: 'Dots', imgSrc: 'https://app.qr-code-generator.com/img/patterns/dots.png' },
    { value: 'extra-rounded', label: 'Extra Rounded', imgSrc: 'https://app.qr-code-generator.com/img/patterns/rounded-1.png' },
    { value: 'classy-rounded', label: 'Classy rounded', imgSrc: 'https://app.qr-code-generator.com/img/patterns/connect-horizontal.png' },
  ];

  // cornerSquareOptions.ts
export interface CornerSquareOption {
  value: string;
  label: string;
  imgSrc: string;
}

export const cornerSquareOptions: CornerSquareOption[] = [
  { value: 'rounded', label: 'Rounded', imgSrc: 'https://www.qrcode-tiger.com/static/img/Home/Eyes/01-01.svg' },
  { value: 'square', label: 'Square', imgSrc: 'https://www.qrcode-tiger.com/static/img/Home/Eyes/00-00.svg' },
  { value: 'extra-rounded', label: 'Extra Rounded', imgSrc: 'https://www.qrcode-tiger.com/static/img/Home/Eyes/02-02.svg' },
  // Add more options as needed
];


// cornerDotOptions.ts
export interface CornerDotOption {
  value: string;
  label: string;
  imgSrc: string;
}

export const cornerDotOptions: CornerDotOption[] = [
  { value: 'dot', label: 'Dot', imgSrc: 'https://static.vecteezy.com/system/resources/thumbnails/015/734/136/small_2x/black-circle-icon-geometry-silhouette-png.png' },
  { value: 'square', label: 'Square', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF0Os5-_iPnJQgfPHEjv38FWF4mErngpb6OIXTcTsIMQ&s' },
  // Add more options as needed
];
