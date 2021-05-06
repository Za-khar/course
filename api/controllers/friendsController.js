const { friendService } = require('../services')

class FriendsController {
  async getFriends(req, res) {
    try {
      const user_id = req.params.id
      const friends = await friendService.getFriends(user_id)
      res.send(friends)
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Friend list error!' })
    }
  }

  async getIncomingRequests(req, res) {
    try {
      const user_id = req.params.id
      const requests = await friendService.getIncomingRequests(user_id)
      res.send(requests)
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Incoming request list error!' })
    }
  }

  async getOutgoingRequests(req, res) {
    try {
      const user_id = req.params.id
      const requests = await friendService.getOutgoingRequests(user_id)
      res.send(requests)
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Outgoing request list error!' })
    }
  }

  async sendFriendRequest(req, res) {
    try {
      await friendService.sendFriendRequest(req.user.user_id, req.body.user_id)
      res.send({ message: 'Friend request successfully sent' })
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Send friend request error!' })
    }
  }

  async cancelFriendRequest(req, res) {
    try {
      await friendService.cancelFriendRequest(
        req.user.user_id,
        req.body.user_id
      )
      res.send({ message: 'Request canceled successfully' })
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Cancle request error!' })
    }
  }

  async confirmFriendRequest(req, res) {
    try {
      await friendService.confirmFriendRequest(
        req.user.user_id,
        req.body.user_id
      )
      res.send({ message: 'Request confirmed successfully' })
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Confirm request error!' })
    }
  }

  async rejectFriendRequest(req, res) {
    try {
      await friendService.rejectFriendRequest(
        req.user.user_id,
        req.body.user_id
      )
      res.send({ message: 'Request rejected successfully' })
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Reject request error!' })
    }
  }

  async deleteFriend(req, res) {
    try {
      await friendService.deleteFriend(req.user.user_id, req.body.user_id)
      res.send({ message: 'Friend deleted successfully' })
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Friend deletion error!' })
    }
  }

  async searchUser(req, res) {
    try {
      const users = await friendService.searchUser(
        req.params.name.toString(),
        req.user.user_id
      )
      res.send(users)
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Search error!' })
    }
  }
}

module.exports = new FriendsController()
