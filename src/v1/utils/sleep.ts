export const sleep = (time: number) => new Promise<boolean>((resolve: any) => {
    setTimeout(() => {
        resolve(true)
    }, time * 1e3);
})