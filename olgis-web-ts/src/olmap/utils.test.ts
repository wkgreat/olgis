import {arrayContains} from "./utils";

enum TestEnum {
    A,
    B,
    C,
    D,
    E,
    F
}

describe("arrayContains", ()=>{

    test("test check", ()=>{
        expect(1).toEqual(1)
    });


    test("arrayContains expect right", ()=>{

        const a = ["a","b","c"];
        expect(arrayContains(a,"a")).toBeTruthy();
        expect(arrayContains(a,"b")).toBeTruthy();
        expect(arrayContains(a,"c")).toBeTruthy();
        expect(arrayContains(a,"d")).not.toBeTruthy();
    });



    test("arrayContains expect right 2", ()=>{
        const a = [TestEnum.A, TestEnum.B, TestEnum.C];
        expect(arrayContains(a, TestEnum.A)).toBeTruthy();
        expect(arrayContains(a, TestEnum.B)).toBeTruthy();
        expect(arrayContains(a, TestEnum.C)).toBeTruthy();
        expect(arrayContains(a, TestEnum.D)).not.toBeTruthy();
        expect(arrayContains(a, TestEnum.E)).not.toBeTruthy();
        expect(arrayContains(a, TestEnum.F)).not.toBeTruthy();
    })
    
});