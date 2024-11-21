const posts = [
    {
        id: 1,
        username: 'explorer',
        imageUrl: 'https://picsum.photos/600/600?random=1',
        caption: 'Beautiful sunset over the mountains! 🌄',
        likes: 342,
        comments: [
            { id: 1, username: 'traveler', text: 'Wow, amazing shot!' },
            { id: 2, username: 'nature_lover', text: 'Where is this?' }
        ]
    },
    {
        id: 2,
        username: 'foodie',
        imageUrl: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
        caption: 'Delicious breakfast spread! 🥐☕',
        likes: 256,
        comments: [
            { id: 1, username: 'chef', text: 'Looks yummy!' }
        ]
    }
];


function renderComments(comments) {
    return comments.map(comment => `
        <div class="comment">
            <strong>${comment.username}</strong> ${comment.text}
        </div>
    `).join('');
}


function renderPost(post) {
    return `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <div class="user-avatar"></div>
                <strong>${post.username}</strong>
            </div>
            <img src="${post.imageUrl}" class="post-image" alt="Post by ${post.username}">
            <div class="post-actions">
                <svg class="like-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
            <div class="post-likes">${post.likes} likes</div>
            <div class="post-caption">
                <strong>${post.username}</strong> ${post.caption}
            </div>
            <div class="comments">
                ${renderComments(post.comments)}
                <div class="comment-input">
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
                </div>
            </div>
        </div>
    `;
}


function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = posts.map(renderPost).join('');
    addEventListeners();
}


function addEventListeners() {
    
    document.querySelectorAll('.like-button').forEach(likeButton => {
        likeButton.addEventListener('click', function() {
            const postElement = this.closest('.post');
            const postId = postElement.dataset.postId;
            const likesElement = postElement.querySelector('.post-likes');
           
            this.classList.toggle('liked');
           
           
            const post = posts.find(p => p.id === parseInt(postId));
            if (this.classList.contains('liked')) {
                post.likes++;
            } else {
                post.likes--;
            }
           
          
            likesElement.textContent = `${post.likes} likes`;
        });
    });

    
    document.querySelectorAll('.comment-input button').forEach(button => {
        button.addEventListener('click', function() {
            const postElement = this.closest('.post');
            const postId = postElement.dataset.postId;
            const inputElement = this.previousElementSibling;
            const commentText = inputElement.value.trim();

            if (commentText) {
                const post = posts.find(p => p.id === parseInt(postId));
               
                
                post.comments.push({
                    id: post.comments.length + 1,
                    username: 'current_user',
                    text: commentText
                });

                const commentsContainer = postElement.querySelector('.comments');
                commentsContainer.innerHTML = renderComments(post.comments) + `
                    <div class="comment-input">
                        <input type="text" placeholder="Add a comment...">
                        <button>Post</button>
                    </div>
                `;

             
                inputElement.value = '';

                
                addEventListeners();
            }
        });
    });
}


renderPosts();