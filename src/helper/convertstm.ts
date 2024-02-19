const convertstm = (second: number): string => {
    return `${Math.floor(second / 60)}:${
        Math.floor(second % 60) === 0
            ? '00'
            : Math.floor(second % 60) < 10
            ? `0${Math.floor(second % 60)}`
            : Math.floor(second % 60)
    }`;
};
export default convertstm;
