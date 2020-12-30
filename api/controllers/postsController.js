
class PostsController {
    async createPost(req, res) {
        res.json('createPost');
    }

    async getPosts(req, res) {
        res.json('getPosts');
    }

    async getOnePost(req, res) {
        res.json(`get post number ${req.params.id}`);
    }

    async updatePost(req,res) {
        res.json(`update post number ${req.params.id}`);
    }

    async deletePost(req, res) {
        res.json(`delete post number ${req.params.id}`);
    }
}

module.exports = new PostsController();