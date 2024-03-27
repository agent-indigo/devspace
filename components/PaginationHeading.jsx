import Layout from './Layout'
const PaginationHeading = ({title, children}) => {
    return (
        <Layout title={title}>
            <div className="flex justify-between">
                <div className="w-3/4 mr-10">
                    <h1 className='text-5xl border-b-4 p-5 font-bold'>{title}</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {children}
                    </div>
                </div>
                <div className="w-1/4">
                    {categories}
                </div>
            </div>
        </Layout>
    )
}
export default PaginationHeading