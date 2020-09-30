describe("TableData", ()=>{

    test("array to obj", ()=>{

        const theArray: string[] = [
            "xx",
            "yy",
            "zz"
        ];

        const row: string[] = [
            "liubei",
            "guanyu",
            "zhangfei"
        ];

        const obj = theArray.map(((value, index) => ({
            value: row[index]
        })));

        console.log(obj);

    })

});