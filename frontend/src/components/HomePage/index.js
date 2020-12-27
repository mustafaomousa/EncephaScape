import CardView from '../CardView';

const HomePage = () => {
    return (
        <>
            <h1>Home</h1>
            <div className='slideshow'>
                Slideshow goes here
            </div>
            <CardView />
            <div className='categories'>
                <h4>Categories:</h4>
                <div>Display categories here</div>
            </div>
        </>
    )
};

export default HomePage;