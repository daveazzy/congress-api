export function validateCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    const digits = cleanCPF.split('').map(Number);

    // Função para calcular o dígito verificador
    const calculateDigit = (num: number[], weight: number): number => {
        const sum = num.reduce((acc, digit, index) => acc + digit * (weight - index), 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    // Calcula o primeiro dígito verificador
    const firstDigit = calculateDigit(digits.slice(0, 9), 10);
    // Calcula o segundo dígito verificador
    const secondDigit = calculateDigit(digits.slice(0, 9).concat(firstDigit), 11);

    // Verifica se os dígitos verificadores calculados coincidem com os fornecidos
    return digits[9] === firstDigit && digits[10] === secondDigit;
}
