const state = {
    foo: "value for foo",
    bar: "value for bar",
};

const target = {
    sayFoo() {
        console.log("foo")
    }
}

const dynamicGetter = new Proxy(
    target,
    {
        get(target, propName) {
            if (propName in state) {
                return state[propName];
            };

            if (propName in target) {
                return target[propName]
            }

            return undefined;
        },
        set(target, propName, value){

        }
    }
);

console.log(dynamicGetter.foo); // "value for foo"
console.log(dynamicGetter.bar); // "value for bar"
console.log(dynamicGetter.baz); // undefined

console.log(dynamicGetter.sayFoo()); 
