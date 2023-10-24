console.log(`Lets begin`);
//Guanine ('G'), Cytosine ('C'), Adenine ('A'), and Thymine ('T').
//Ribonucleic acid, RNA, is the primary messenger molecule in cells.
//RNA differs slightly from DNA its chemical structure and contains no Thymine.
//In RNA Thymine is replaced by another nucleic acid Uracil ('U').

const dnaToRna = function (dna) {
  const rna = dna.replace(/T/g, 'U');
  console.log(rna);
  return rna;
};
dnaToRna('TTTT');
dnaToRna('GCAT');
dnaToRna('GACCGCCGCC');
