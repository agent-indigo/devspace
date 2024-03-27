const pagination = (currentPage, totalPages, baseUrl) => {
  const links = []
  for (let i = 1; i <= totalPages; i++) {
    links.push({
      page: i,
      url: `${baseUrl}/page/${i}`,
      isActive: i === currentPage,
    })
  }
  return links
}
export default pagination