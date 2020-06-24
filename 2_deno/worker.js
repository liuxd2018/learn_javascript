self.onmessage = async (e) => {
    const data = e.data
    console.log(e)

    self.close()
}