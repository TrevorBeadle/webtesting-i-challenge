const { repair, success, fail, get } = require("./enhancer.js");
// test away!

const item = {
  name: "sword",
  durability: 20,
  enhancement: 0,
};

describe("enhancer tests", () => {
  it("repairs item", () => {
    expect(repair(item)).toEqual({
      name: "sword",
      durability: 100,
      enhancement: 0,
    });
  });

  it("adds enhancement on success", () => {
    const repairedItem = success(item);

    expect(repairedItem).toEqual({ ...item, durability: 100, enhancement: 1 });
    expect(success(repairedItem)).toEqual({ ...repairedItem, enhancement: 2 });
  });

  it("does not repair if there are 20 enhancements", () => {
    const newItem = { ...item, enhancement: 20 };
    expect(success(newItem)).toEqual(newItem);
  });

  it("decreases durability and enhancement correctly on fail", () => {
    const newItem = { ...item, enhancement: 15 };
    const newItem2 = { ...item, enhancement: 16 };
    const newItem3 = { ...item, enhancement: 17 };

    expect(fail(item)).toEqual({ ...item, durability: item.durability - 5 });

    expect(fail(newItem)).toEqual({
      ...newItem,
      durability: item.durability - 10,
    });
    
    expect(fail(newItem2)).toEqual({
      ...newItem2,
      durability: newItem2.durability - 10,
      enhancement: newItem2.enhancement - 1,
    })

    expect(fail(newItem3)).toEqual({
      ...newItem3,
      durability: newItem3.durability - 10,
      enhancement: newItem3.enhancement - 1,
    })
  });
});
