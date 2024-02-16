export const scapeCPF = (cpf: string) => {
    return cpf.replace(/\.|-/gm, '');
}