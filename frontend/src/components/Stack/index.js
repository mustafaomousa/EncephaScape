const Stack = ({ stack }) => {
    return (
        <div className='single-stack-container'>
            <div className={`single-stack stack-${stack.id}`} key={`stack-${stack.id}`}>
                <a href={`/stack/${stack.id}`}>{stack.name}</a>
                <p id='by-statement'>by {stack.User.username}</p>
                <p>created at {stack.createdAt}</p>
            </div>
        </div>
    )
};

export default Stack;