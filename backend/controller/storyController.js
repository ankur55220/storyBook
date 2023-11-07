import mongoose from "mongoose";
import { Story } from "../model/Stories.js";
import { AsyncMiddleWare } from "../middleware/AsyncMiddleWare.js";
import { User } from "../model/User.js";
import { Comment } from "../model/Comment.js";
import ErrorClass from "../middleware/NewErrorClass.js";
import { Audio } from "../model/Audio.js";

export const searchUser = AsyncMiddleWare(async (req, res, next) => {
  const { text } = req.body;

  console.log(text);

  const AllUsers = await User.find({ username: { $regex: "^" + text } });

  res.status(200).json({ AllUsers });
});

export const Follow = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { userWhoIsBeingFollowed } = req.body;

  console.log(userWhoIsBeingFollowed, "<-------hereeee");
  const user1 = await User.findById(id);

  const user2 = await User.findById(userWhoIsBeingFollowed);

  if (user2.followers.filter((item) => JSON.stringify(item._id) == JSON.stringify(id)).length == 0) {
    user2.followers.push(id);
  } else {
    user2.followers = user2.followers.filter((data) => JSON.stringify(data._id) != JSON.stringify(id));
  }

  await user2.save();

  if (
    user1.following.filter((item) => JSON.stringify(item._id) == JSON.stringify(userWhoIsBeingFollowed))
      .length == 0
  ) {
    user1.following.push(userWhoIsBeingFollowed);
  } else {
    user1.following = user1.following.filter(
      (data) => JSON.stringify(data._id) != JSON.stringify(userWhoIsBeingFollowed)
    );
  }

  await user1.save();

  res.status(200).json({ success: "successfully followed" });
});

export const isFollowing = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { currUser } = req.body;
  console.log(currUser, "here check it out");

  if (!currUser) {
    return res.status(200).json({ result: false });
  }

  const user2 = await User.findById(currUser);

  let ans = false;

  if (user2 && user2.followers.filter((item) => JSON.stringify(item._id) == JSON.stringify(id)).length > 0) {
    ans = true;
  }

  res.status(200).json({ result: ans });
});

export const likedAndNumbers = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;
  const { type, postid } = req.body;

  let ans = {};

  const user = await User.findById(id);

  if (type == "audios") {
    const found = await Audio.findById(postid);
    if (!found) {
      return;
    }
    const likesThrere = user.likes.filter((item) => item.id == found?._id);
    const dislikesThere = user.dislikes.filter((item) => item.id == found?._id);

    if (likesThrere.length > 0) {
      ans.presentLike = true;
      ans.presentDislike = false;
    } else if (dislikesThere.length > 0) {
      ans.presentLike = likesThrere.length > 0;
      ans.presentDislike = dislikesThere > 0;
    }

    ans.totalLikes = found.likes;
    ans.totlaDisLikes = found.dislikes;
  } else if (type == "scripts") {
    const found = await Story.findById(postid);
    if (!found) {
      return;
    }
    const likesThrere = user.likes.filter((item) => item.id == found._id);
    const dislikesThere = user.dislikes.filter((item) => item.id == found._id);

    if (likesThrere.length > 0) {
      ans.presentLike = true;
      ans.presentDislike = false;
    } else if (dislikesThere.length > 0) {
      ans.presentLike = false;
      ans.presentDislike = true;
    } else {
      ans.presentLike = likesThrere.length > 0;
      ans.presentDislike = dislikesThere.length > 0;
    }

    ans.totalLikes = found.likes;
    ans.totlaDisLikes = found.dislikes;
  } else if (type == "comments") {
    const found = await Comment.findById(postid);

    if (!found) {
      return;
    }

    const likesThrere = user.likes.filter((item) => item.id == found._id);
    const dislikesThere = user.dislikes.filter((item) => item.id == found._id);

    if (likesThrere.length > 0) {
      ans.presentLike = true;
      ans.presentDislike = false;
    } else if (dislikesThere.length > 0) {
      ans.presentLike = false;
      ans.presentDislike = true;
    } else {
      ans.presentLike = likesThrere.length > 0;
      ans.presentDislike = dislikesThere.length > 0;
    }

    ans.totalLikes = found.likes;
    ans.totlaDisLikes = found.dislikes;
  }

  res.status(200).json(ans);
});

export const AddNewStory = AsyncMiddleWare(async (req, res, next) => {
  const { body, format, status } = req.body;

  const { id } = req.user;

  const newStory = await new Story.create({
    body: body,
    author: id,
  });

  await newStory.save();

  res.status(200).json({
    success: true,
    msg: "succesfully added",
  });
});

export const publishStory = AsyncMiddleWare(async (req, res, next) => {
  const { id, summary } = req.body;

  if (!summary) {
    return next(new ErrorClass("feilds cannot be empty", 401));
  }

  const story = await Story.findByIdAndUpdate(id, {
    $set: { summary: summary, status: "published" },
  });

  if (!story) {
    return next(new ErrorClass("no such story Exists", 404));
  }

  res.status(200).json({
    success: true,
    msg: "successfully published",
  });
});

export const markAsSeen = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId, index } = req.body;

  if (!req.user.user) {
    return next(new ErrorClass("You are not Logged In", 401));
  }

  const user = await User.findById(id);

  const noti = user.notifications.findIndex((item) => item._id == index);

  //    console.log(user,postId,"------------->>>>>>>>>>>---888")

  user.notifications[noti].seen = "yes";

  user
    .save()
    .then((item) => {})
    .catch((err) => {});

  res.status(200).json({
    success: true,
  });
});

export const getUserId = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  if (!req.user.user) {
    return next(new ErrorClass("You are not Logged In", 401));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("You are not Logged In", 401));
  }
  const noti = user.notifications.slice(0, 11);
  const notiCount = noti.filter((item) => item.seen == "no");

  res.status(200).json({
    success: true,
    id: req.user.user.id,
    notifications: noti,
    notiCount: notiCount.length,
    img: user.profilePic,
  });
});

// get stories start
export const getAllStory = AsyncMiddleWare(async (req, res, next) => {
  const allStories = await Story.find({ format: "script" });

  const authors = await Promise.all(
    allStories.map(async (item) => {
      let user = await User.findById(item.author);

      return user.json();
    })
  );

  res.status(200).json({
    success: true,
    allStories,
    authors,
  });
});

export const getAllpublishedStories = AsyncMiddleWare(
  async (req, res, next) => {
    try {
    //   console.log("llllllllllllllkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjj");
      const { id } = req.user.user;

      const user = await User.findById(id);

      const publishedStories = await Story.find({ status: "published" });

      const likesNo = publishedStories.map((item) => item.likes);
      const dislikesNo = publishedStories.map((item) => item.dislikes);

      const authors = await Promise.all(
        publishedStories.map(async (item) => {
          let user = await User.findById(item.author);

          return user;
        })
      );

      const liked = publishedStories.map((item) => {
        if (user.likes.filter((item1) => item1.id == item._id).length > 0) {
          return true;
        } else {
          return false;
        }
      });

      const disliked = publishedStories.map((item) => {
        if (user.dislikes.filter((item1) => item1.id == item._id).length > 0) {
          return true;
        } else {
          return false;
        }
      });

      res.status(200).json({
        success: true,
        posts: publishedStories,
        authors,
        likesNo,
        dislikesNo,
        userLiked: liked,
        userDisliked: disliked,
        img: user.profilePic,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const getpublishedById = AsyncMiddleWare(async (req, res, next) => {
  const loggedUser = req.user.user;
  const { id } = req.body;
  const publishedStories = await Story.find({
    $and: [{ author: id }, { status: "published" }],
  });

  const likesNo = publishedStories.map((item) => item.likes);
  const dislikesNo = publishedStories.map((item) => item.dislikes);

  const authors = await Promise.all(
    publishedStories.map(async (item) => {
      let user = await User.findById(item.author);

      return user;
    })
  );

  const user = await User.findById(id);

  const publishedCount = await Story.find({
    $and: [{ author: id }, { status: "published" }],
  }).count();

  const data = {
    username: user.username,
    email: user.email,
    joined: user.createdAt,
    count: publishedCount,
    img: user.profilePic,
  };

  const logged = await User.findById(loggedUser.id);

  const liked = publishedStories.map((item) => {
    if (logged.likes.filter((item1) => item1.id == item._id).length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const disliked = publishedStories.map((item) => {
    if (logged.dislikes.filter((item1) => item1.id == item._id).length > 0) {
      return true;
    } else {
      return false;
    }
  });

  res.status(200).json({
    success: true,
    posts: publishedStories,
    authors,
    user: data,
    likesNo,
    dislikesNo,
    userLiked: liked,
    userDisliked: disliked,
  });
});

export const addFavourite = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { summary, body, authorId, postId } = req.body;

  if (!body || !postId) {
    return next(new ErrorClass("something went wrong", 500));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("no user found", 404));
  }

  const found = user.Saved.filter((item) => item.postId == postId);

  if (found.length > 0) {
    return next(new ErrorClass("you have already saved", 404));
  }

  const data = {
    summary,
    body,
    authorId,
    postId,
    bookmarks: [],
  };

  user.Saved.push(data);

  await user.save();

  res.status(200).json({
    success: true,
  });
});

export const getAllUnPublishedStories = AsyncMiddleWare(
  async (req, res, next) => {
    const unPublishedStories = await Story.find({ status: "unpublished" });

    const authors = await Promise.all(
      unPublishedStories.map(async (item) => {
        let user = await User.findById(item.author);

        return user.json();
      })
    );

    res.status(200).json({
      success: true,
      unPublishedStories,
      authors,
    });
  }
);

export const AllStoriesByUser = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorClass("User does not exists", 404));
  }

  const publishedCount = await Story.find({
    $and: [{ author: id }, { status: "published" }],
  }).count();

  const data = {
    username: user.username,
    email: user.email,
    joined: user.createdAt,
    count: publishedCount,
    img: user.profilePic,
  };

  const AllStories = await Story.find({
    $and: [{ author: id }, { status: "unpublished" }, { isSaved: true }],
  });

  const likesNo = AllStories.map((item) => item.likes);
  const dislikesNo = AllStories.map((item) => item.dislikes);

  if (AllStories.length == 0) {
    res.status(200).json({
      success: true,
      posts: [],
      authors: [],
      user: data,
      likesNo,
      dislikesNo,
      userLiked: [],
      userDisliked: [],
    });

    return;
  }

  const liked = AllStories.map((item) => {
    if (user.likes.filter((item1) => item1.id == item._id).length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const disliked = AllStories.map((item) => {
    if (user.dislikes.filter((item1) => item1.id == item._id).length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const data4 = {
    success: true,
    posts: AllStories,
    authors: [user],
    user: data,
    likesNo,
    dislikesNo,
    userLiked: liked,
    userDisliked: disliked,
  };

  res.status(200).json(data4);
});

export const storiesPublishedByUser = AsyncMiddleWare(
  async (req, res, next) => {
    const { id } = req.user.user;

    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorClass("User does not exists", 404));
    }

    const publishedCount = await Story.find({
      $and: [{ author: id }, { status: "published" }],
    }).count();

    const data = {
      username: user.username,
      email: user.email,
      joined: user.createdAt,
      count: publishedCount,
      img: user.profilePic,
    };

    const AllStories = await Story.find({
      $and: [{ author: id }, { status: "published" }],
    });

    const likesNo = AllStories.map((item) => item.likes);
    const dislikesNo = AllStories.map((item) => item.dislikes);

    const liked = AllStories.map((item) => {
      if (user.likes.filter((item1) => item1.id == item._id).length > 0) {
        return true;
      } else {
        return false;
      }
    });

    const disliked = AllStories.map((item) => {
      if (user.dislikes.filter((item1) => item1.id == item._id).length > 0) {
        return true;
      } else {
        return false;
      }
    });

    res.status(200).json({
      success: true,
      posts: AllStories,
      authors: [user],
      user: data,
      likesNo,
      dislikesNo,
      userLiked: liked,
      userDisliked: disliked,
    });
  }
);

export const getAllFav = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("User does not exists", 404));
  }

  const publishedCount = await Story.find({
    $and: [{ author: id }, { status: "published" }],
  }).count();

  const data = {
    username: user.username,
    email: user.email,
    joined: user.createdAt,
    count: publishedCount,
    img: user.profilePic,
  };

  const authors = await Promise.all(
    user.Saved.map(async (item) => {
      let user = await User.findById(item.authorId);

      return user;
    })
  );

  const liked = user.Saved.map((item) => {
    if (user.likes.filter((item1) => item1.id == item.postId).length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const disliked = user.Saved.map((item) => {
    if (user.dislikes.filter((item1) => item1.id == item.postId).length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const likesNo = await Promise.all(
    user.Saved.map(async (item) => {
      let user2 = await Story.findById(item.postId);

      return user2.likes;
    })
  );

  const dislikesNo = await Promise.all(
    user.Saved.map(async (item) => {
      let user3 = await Story.findById(item.postId);

      return user3.dislikes;
    })
  );

  res.status(200).json({
    success: true,
    posts: user.Saved,
    authors,
    user: data,
    likesNo,
    dislikesNo,
    userLiked: liked,
    userDisliked: disliked,
  });
});

export const getSingleStory = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.body;

  const loggedUser = req.user.user;
  const story = await Story.findById(id);

  if (!story) {
    return next(new ErrorClass("no such story present", 404));
  }

  const author = await User.findById(story.author);

  const user = await User.findById(loggedUser.id);

  const publishedCount = await Story.find({
    $and: [{ author: id }, { status: "published" }],
  }).count();

  const data = {
    username: user.username,
    email: user.email,
    joined: user.createdAt,
    count: publishedCount,
    img: user.profilePic,
  };

  const found = user.Saved.filter((item) => item.postId == id);
  const liked = user.likes.filter((item) => item.id == id);
  const disliked = user.dislikes.filter((item) => item.id == id);

  res
    .status(200)
    .json({
      success: true,
      posts: [story],
      authors: [author],
      isFav: found.length > 0,
      user: data,
      likes: [story.likes],
      dislikes: [story.dislikes],
      userLiked: [liked.length > 0],
      userDisliked: [disliked.length > 0],
    });
});

export const getSingleSave = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId, extraId } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("no such user found", 404));
  }

  const post = user.Saved.filter((item) => item.postId == postId);

  if (post.length == 0) {
    return next(new ErrorClass("no favourite found", 404));
  }

  res.status(200).json({
    success: true,
    post,

    authors: [user],
  });
});

export const addbookmark = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId, bookmarks } = req.body;

  if (!bookmarks) {
    return next(
      new ErrorClass("something went wrong,couldn't ass bookmark", 500)
    );
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("user was not found", 404));
  }

  const index = user.Saved.findIndex((item) => item.postId == postId);

  if (index == -1) {
    return next(new ErrorClass("something went wrong", 404));
  }

  user.Saved[index].bookmarks = bookmarks;

  await user.save();

  res.status(200).json({
    sucess: true,
  });
});

export const removeBookmark = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId, bookmarks } = req.body;

  if (!bookmarks) {
    return next(
      new ErrorClass("something went wrong,couldn't ass bookmark", 500)
    );
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("user was not found", 404));
  }

  const index = await user.Saved.findIndex((item) => item.postId == postId);

  if (saved.length == 0) {
    return next(new ErrorClass("something went wrong", 404));
  }

  user.Saved[index].bookmarks = bookmarks;

  await user.save();

  res.status(200).json({
    sucess: true,
  });
});

export const getAllBookMark = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("user was not found", 404));
  }

  const allBookmarks = user.Saved.findIndex((item) => item.postId == postId);

  if (allBookmarks == -1) {
    return next(new ErrorClass("no posts found", 404));
  }

  res.status(200).json({
    sucess: true,
    bookmarks: user.Saved[allBookmarks].bookmarks,
  });
});

export const getSingleBookMark = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId, docId } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("user was not found", 404));
  }

  const index = user.Saved.findIndex((item) => item.postId == postId);

  if (index == -1) {
    return next(new ErrorClass("no posts found", 404));
  }

  const data = user.Saved[index].bookmarks.filter((item) => item.id == docId);
  res.status(200).json({
    sucess: true,
    bookmark: data[0],
  });
});

export const updateFav = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postId, body } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorClass("user was not found", 404));
  }

  const index = user.Saved.findIndex((item) => item.postId == postId);

  if (index == -1) {
    return next(new ErrorClass("no posts found", 404));
  }

  user.Saved[index].body = body;

  await user.save();
  res.status(200).json({
    sucess: true,
  });
});

export const editSave = AsyncMiddleWare(async (req, res, next) => {
  const { title, body, genre } = req.body;

  if (!title || !body || !genre) {
    return next(new ErrorClass("fields cant be empty", 401));
  }

  const { id } = req.user.user;

  const newStory = await Story.create({
    body,
    title,
    author: id,
    genre,
    isSaved: true,
    format: "script",
    status: "unpublished",
  });

  await newStory.save();

  res.status(200).json({
    success: true,
    msg: "successfully saved",
  });
});

export const deleteSave = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return next(new ErrorClass("something went wrong", 401));
  }

  const update = await Story.findByIdAndUpdate(id, {
    $set: { isSaved: false },
  });

  res.status(200).json({
    success: true,
    msg: "successfully deleted",
  });
});

// get stories ends

//update and delete starts

export const updateStory = AsyncMiddleWare(async (req, res, next) => {
  const { storyId, storyBody } = req.body;
  const { id } = req.user.user;

  const story = await Story.findById(storyId);

  if (!story) {
    return next(new ErrorClass("no such story present", 404));
  }

  if (story.author != id) {
    return next(new ErrorClass("you dont have permission", 404));
  }

  const updatedStory = await Story.findByIdAndUpdate(storyId, {
    body: { $set: storyBody },
  });

  res.status(200).json({ success: true, updatedStory, msg: "updateSuccess" });
});

export const deleteStory = AsyncMiddleWare(async (req, res, next) => {
  const { storyId, storyBody } = req.body;
  const { id } = req.user.user;

  const story = await Story.findById(storyId);

  if (!story) {
    return next(new ErrorClass("no such story present", 404));
  }

  if (story.author != id) {
    return next(new ErrorClass("you dont have permission", 404));
  }

  const updatedStory = await Story.findByIdAndDelete(storyId);

  res.status(200).json({ success: true, msg: "successfully deleted" });
});

export const updateedit = AsyncMiddleWare(async (req, res, next) => {
  const { postId, title, body, genre } = req.body;

  if (!title || !body || !genre) {
    return next(new ErrorClass("feilds cant be empty", 401));
  }

  const updated = await Story.findByIdAndUpdate(postId, {
    $set: { title: title, body: body, genre: genre },
  });

  if (!updated) {
    return next(new ErrorClass("no such post was found", 404));
  }

  res.status(200).json({
    success: true,
    msg: "successsfully updated",
    posts: updated,
  });
});

export const unPublishScript = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return next(new ErrorClass("feilds cant be empty", 401));
  }

  const updated = await Story.findByIdAndUpdate(id, {
    $set: { status: "unpublished" },
  });

  if (!updated) {
    return next(new ErrorClass("no such post was found", 404));
  }

  res.status(200).json({
    success: true,
    msg: "unpublished successful",
  });
});

export const removeScriptFromFavourite = AsyncMiddleWare(
  async (req, res, next) => {
    const { id } = req.user.user;
    const { postId } = req.body;

    if (!id || !postId) {
      return next(new ErrorClass("feilds cant be empty", 401));
    }

    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorClass("no such user found", 404));
    }

    user.Saved = user.Saved.filter((item) => item.postId != postId);

    await user.save();

    res.status(200).json({
      success: true,
      msg: "removed successfuly",
    });
  }
);

export const unPublishAudio = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return next(new ErrorClass("feilds cant be empty", 401));
  }

  const updated = await Audio.findByIdAndDelete(id);

  const comm = await Comment.find().populate("author", { _id: id });

  for (let item of comm) {
    await Comment.findByIdAndDelete(item._id);
  }

  if (!updated) {
    return next(new ErrorClass("no such post was found", 404));
  }

  res.status(200).json({
    success: true,
    msg: "unpublished successful",
  });
});

export const removeAudioFromFavourite = AsyncMiddleWare(
  async (req, res, next) => {
    const { id } = req.user.user;
    const { postId } = req.body;

    if (!id || !postId) {
      return next(new ErrorClass("feilds cant be empty", 401));
    }

    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorClass("no such user found", 404));
    }

    user.favAudio = user.favAudio.filter((item) => item != postId);

    await user.save();

    res.status(200).json({
      success: true,
      msg: "removed successful",
    });
  }
);

export const getNamesAndId = AsyncMiddleWare(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorClass("feilds cant be empty", 401));
  }

  const user = await User.find({ username: { $regex: "^" + name + "" } });
  if (!user) {
    return next(new ErrorClass("no such user found", 404));
  }

  res.status(200).json({
    success: true,
    msg: "removed successful",
    names: user,
  });
});

export const AddfollowNotification = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { type, postid, audid, by } = req.body;

  const followers = await User.findById(id);

  if (followers.followers.length == 0) {
    return res.status(200).json({ success: "no followers" });
  }

  const data = {
    format: type == "audios" ? "audiosNoti" : "scripts",
    postid,
    seen: "no",
    audid,
    by,
  };

  

  const post = await Story.findById(postid).populate("author").exec();
  console.log(" ;;",followers.followers,"heyyyyyyyyyyyyyyyyy",by,post.author._id,type,";; ");
  const usersToBeNotified = await Promise.all(
    followers.followers.map(async (item, index) => {
      if (type == "audios" && JSON.stringify(item._id) == JSON.stringify(post.author._id)) {
        const data1 = {
          format: "audiofill",
          postid,
          seen: "no",
          audid,
          by,
        };

        let user = await User.findByIdAndUpdate(item._id, {
          $push: { notifications: data1 },
        });
      }else{
        let user = await User.findByIdAndUpdate(item._id, {
            $push: { notifications: data },
          });
      }

     

      return 1;
    })
  );

  res.status(200).json({ success: "notified" });
});

// export const  followersNotify=AsyncMiddleWare(

//     async (req,res,next)=>{

//         const {id}=req.user.user
//         const {type,postid,audid}=req.body

//         const loggedUser=await User.findById(id)

//         if(loggedUser.followers.length==0){

//             return res.status(200).json({msg:"no followers yet"})
//         }
//         const allFollowers=await Promise.all(loggedUser.followers.map(async(item)=>{

//             let follow=await User.findById(item._id);

//               return follow
//         }))

//         let ans={}

//         if(type=="audios"){

//                 ans.format="audiosNoti"
//                 ans.postid=postid
//                 ans.seen="no"
//                 ans.audid=audid
//                 ans.by=by

//                 const notified=await Promise.all(allFollowers.map(async(item)=>{

//                       item.notifications.unshift(ans)

//                       await item.save()

//                       return 1
//                 }))

//         }else if(type=="scripts"){

//             ans.format="scripts"
//             ans.postid=postid
//             ans.seen="no"
//             ans.audid=audid
//             ans.by=by

//             const notified=await Promise.all(allFollowers.map(async(item)=>{

//                   item.notifications.unshift(ans)

//                   await item.save()

//                   return 1
//             }))

//         }

//     res.status(200).json({success:"notified"})

//     }
// )

export const AddNotification = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { type, postid, data, audid, by } = req.body;

  const user = await User.findById(id);

  if (type == "audios") {

    const data2 = {
        format: "audiosNoti",
        postid,
        seen: "no",
        audid,
        by,
      };
  
      const post = await Story.findById(postid).populate("author").exec();

      
  
      const isAlreadyFollower = user.followers.filter(
        

        (item) => JSON.stringify(item._id) == JSON.stringify(post.author._id)
      );

      console.log(post.author,user.followers,"magggggggg")
  
      if (post && isAlreadyFollower.length == 0) {
        const postUser = await User.findByIdAndUpdate(post.author._id, {
          $push: { notifications: data2 },
        });
      }


      if(data.length==0){
        return res.status(200).json({reason:"no tags"})
      }

    const data1 = {
      format: "audios",
      postid,
      seen: "no",
      audid,
      by,
    };

    const usersToBeNotified = await Promise.all(
      data.map(async (item, index) => {
        let user = await User.findByIdAndUpdate(item.data.userid, {
          $push: { notifications: data1 },
        });

        return 1;
      })
    );

   

    return res.status(200).json({
      success: true,
      msg: "sent notification",
    });
  } else if (type == "scripts") {
    const data1 = {
      format: "scripts",
      postid,
      seen: "no",
      audid: "",
      by,
    };

    if(data.length==0){
        return res.status(200).json({reason:"no tags"})
      }

    const usersToBeNotified = await Promise.all(
      data.map(async (item, index) => {
        let user = await User.findByIdAndUpdate(item.data.userid, {
          $push: { notifications: data1 },
        });

        return 1;
      })
    );

    return res.status(200).json({
      success: true,
      msg: "sent notification",
    });
  }
});

export const AddAudioNotify = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postid, audid } = req.body;

  const author = await User.findById(id);

  const userToBeNotified = author.Saved.filter((item) => item.postId == postid);

  // const data={
  //     format:"audiosNoti",
  //     audid,
  //     postid,
  //     seen:"no",

  // }

  const user = await User.findByIdAndUpdate(userToBeNotified[0].author, {
    $push: {
      notifications: {
        $each: [
          {
            format: "audiosNoti",
            audid,
            postid,
            seen: "no",
          },
        ],
        $position: 0,
      },
    },
  });

  //     user.notifications.unshift(data)

  // await user.save()

  res.status(200).json({
    sucess: true,
    msg: "notification sent",
  });
});

// export const AddLikes=AsyncMiddleWare(async(req,res,next)=>{

//     const {id}=req.user.user

//     const {postid,form,postType}=req.body;

//     const user=await User.findById(id)

//     const likes=user.likes.filter((item)=>item.id==postid)
//     const dislikes=user.dislikes.filter((item)=>item.id==postid)

//     console.log(postid,form,postType,likes,dislikes,"++++++++++++++++++++++++++")
//     const handleLikes=async (type)=>{

//         if(likes.length==0 && dislikes.length==0){

//             console.log("audios","LLLLLLLLLLLLLLLLLLLL")
//             if(type=="audios"){

//                 if(form=="like"){
//                     const updated = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}

//                      }},{new:true})

//                      console.log(updated,"plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
//                      const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                      console.log(audioupdate,"audios","LLLLLLLLLL00000LLLLLLLLLL")
//                 }else if (form=="dislike"){

//                     const updated = await User.findByIdAndUpdate(id,{$push:{
//                         dislikes:{id:postid}

//                      }},{new:true})

//                      const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//                 }

//             }else if (type=="scripts"){

//                 if(form=="like"){

//                     User.findByIdAndUpdate(id,{new:true},{"$push":{
//                         likes:{id:postid}

//                      }})
//                      .then((res)=>{consoleo.log(res)})
//                      .catch((err)=>{

//                      })

//                      const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})

//                 }else if(form=="dislike"){

//                     const updated = await User.findByIdAndUpdate(id,{$push:{
//                         dislikes:{id:postid}

//                      }},{new:true})

//                      const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//                 }

//             }else if(type=="comments"){

//             if(form=="like"){
//                 const updated = await User.findByIdAndUpdate(id,{$push:{
//                     likes:{id:postid}
//                     }
//                  },{new:true})

//                  const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})

//             }else if(form=="dislike"){
//                 const updated = await User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}
//                     }
//                  },{new:true})

//                  const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//             }

//             }

//         }else if(likes.length>0){

//            if(form=="like"){

//             if(type=="audios"){

//                 const updated = await User.findOneAndUpdate(id,{$pull:{
//                     likes:{id:postid}

//                  }},{new:true})

//             const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})

//             }else if (type=="scripts"){

//                 const updated = await User.findOneAndUpdate(id,{$pull:{
//                     likes:{id:postid}

//                  }},{new:true})

//             const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})

//             }else if(type=="comments"){

//                 const updated = await User.findOneAndUpdate(id,{$pull:{
//                     likes:{id:postid}

//                  }},{new:true})

//             const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})

//             }

//            }else if(form=="dislike"){

//             if(type=="audios"){
//                 const updated = await User.findByIdAndUpdate(id,{$pull:{
//                     likes:{id:postid}

//                  }},{new:true})

//                  const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}

//                  }},{new:true})

//            const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
//            const audioupdate2=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//             }else if (type=="scripts"){
//                 const updated = await User.findByIdAndUpdate(id,{$pull:{
//                     likes:{id:postid}

//                  }},{new:true})

//                  console.log(id,"000000000999999998888888")
//                 User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}
//                  }},{new:true})
//                  .then((res)=>{
//                     console.log(res,"000000000)))")
//                  })
//                  .catch((err)=>{
//                     console.log(err,"-iiiiiiii")
//                  })

//            const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
//            const audioupdate2=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//             }else if (type=="comments"){

//                 const updated = await User.findByIdAndUpdate(id,{$pull:{
//                     likes:{id:postid}

//                  }},{new:true})

//                  const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                     dislikes:{id:postid}

//                  }},{new:true})

//            const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:-1}},{new:true})
//            const audioupdate2=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:1}},{new:true})

//             }

//            }

//         }else if(dislikes.length>0){

//             if(form=="like"){

//                 if(type=="audios"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}

//                      }},{new:true})

//                      const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}

//                      }},{new:true})

//                const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                const audioupdate2=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})

//                 }else if (type=="scripts"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})

//                      const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}

//                      }},{new:true})

//     console.log("kkkkkkkkkkkkkkkkkkkk[",postid)

//                const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                const audioupdate2=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})

//                 }else if(type=="comments"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})

//                      const updated2 = await User.findByIdAndUpdate(id,{$push:{
//                         likes:{id:postid}

//                      }},{new:true})

//                const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{likes:1}},{new:true})
//                const audioupdate2=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})

//                 }

//             }else if(form=="dislike"){

//                 if(type=="audios"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})

//                 const audioupdate=await Audio.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})

//                 }else if (type=="scripts"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}

//                      }},{new:true})

//                 const audioupdate=await Story.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})

//                 }else if(type=="comments"){

//                     const updated = await User.findByIdAndUpdate(id,{$pull:{
//                         dislikes:{id:postid}
//                      }},{new:true})

//                 const audioupdate=await Comment.findByIdAndUpdate(postid,{$inc:{dislikes:-1}},{new:true})

//                 }

//             }

//         }

//     }

//     handleLikes(postType)

//     res.status(200).json({
//         success:true,
//         msg:'successfully appreciated',
//         postType
//     })

// })

export const AddLikes = AsyncMiddleWare(async (req, res, next) => {
  const { id } = req.user.user;

  const { postid, form, postType } = req.body;

  let zerolike = true;
  let zeroDislike = true;

  const user = await User.findById(id);

  const likes = user.likes.filter((item) => item.id == postid);
  const dislikes = user.dislikes.filter((item) => item.id == postid);

  if (likes.length == 0 && dislikes.length == 0) {
    if (postType == "audios") {
      if (form == "like") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { likes: 1 } },
          { new: true }
        );

        zerolike = false;
      } else if (form == "dislike") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: 1 } },
          { new: true }
        );
        zerolike = false;
      }
    } else if (postType == "scripts") {
      if (form == "like") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Story.findByIdAndUpdate(
          postid,
          { $inc: { likes: 1 } },
          { new: true }
        );

        zerolike = false;
      } else if (form == "dislike") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Story.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: 1 } },
          { new: true }
        );

        zeroDislike = false;
      }
    } else if (postType == "comments") {
      if (form == "like") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { likes: 1 } },
          { new: true }
        );
        zerolike = false;
      } else if (form == "dislike") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: 1 } },
          { new: true }
        );
        zeroDislike = 0;
      }
    }
  } else if (likes.length > 0 && zerolike) {
    if (form == "like") {
      if (postType == "audios") {
        const updated = await User.findOneAndUpdate(
          id,
          {
            $pull: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { likes: -1 } },
          { new: true }
        );
      } else if (postType == "scripts") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Story.findByIdAndUpdate(
          postid,
          { $inc: { likes: -1 } },
          { new: true }
        );
      } else if (postType == "comments") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { likes: -1 } },
          { new: true }
        );
      }
    } else if (form == "dislike") {
      if (postType == "audios") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const updated2 = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { likes: -1 } },
          { new: true }
        );
        const audioupdate2 = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: 1 } },
          { new: true }
        );

        zeroDislike = false;
      } else if (postType == "scripts") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const updated2 = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Story.findByIdAndUpdate(
          postid,
          { $inc: { likes: -1 } },
          { new: true }
        );
        const audioupdate2 = await Story.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: 1 } },
          { new: true }
        );
      } else if (postType == "comments") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const updated2 = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { likes: -1 } },
          { new: true }
        );
        const audioupdate2 = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: 1 } },
          { new: true }
        );
      }
    }
  } else if (dislikes.length > 0 && zeroDislike) {
    if (form == "like") {
      if (postType == "audios") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const updated2 = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { likes: 1 } },
          { new: true }
        );
        const audioupdate2 = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: -1 } },
          { new: true }
        );
      } else if (postType == "scripts") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const updated2 = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Story.findByIdAndUpdate(
          postid,
          { $inc: { likes: 1 } },
          { new: true }
        );
        const audioupdate2 = await Story.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: -1 } },
          { new: true }
        );
      } else if (postType == "comments") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const updated2 = await User.findByIdAndUpdate(
          id,
          {
            $push: {
              likes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { likes: 1 } },
          { new: true }
        );
        const audioupdate2 = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: -1 } },
          { new: true }
        );
      }
    } else if (form == "dislike") {
      if (postType == "audios") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Audio.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: -1 } },
          { new: true }
        );
      } else if (postType == "scripts") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Story.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: -1 } },
          { new: true }
        );
      } else if (postType == "comments") {
        const updated = await User.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikes: { id: postid },
            },
          },
          { new: true }
        );

        const audioupdate = await Comment.findByIdAndUpdate(
          postid,
          { $inc: { dislikes: -1 } },
          { new: true }
        );
      }
    }
  }

  const newNumbers = await User.findById(id);

  res.status(200).json({
    success: true,
    msg: "successfully appreciated",
    likes: newNumbers.likes,
    dislikes: newNumbers.dislikes,
    postType,
  });
});

//update and delete ends
