describe("addItemForm", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer

    // eslint-disable-next-line no-undef
    await page.goto("http://localhost:6006/iframe.html?id=todolist-additemform--basic", { waitUntil: "networkidle2" })

    // eslint-disable-next-line no-undef
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
