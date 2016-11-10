interactive-gamepad
===================

This is an experimental (and fairly simple) proof of concept for integrating Beam Interactive into any controller-compatible game, written in Node using node-ffi and vXBoxInterface.

In short, the C++ library creates a virtual Xbox controller, which is recognised and used by whatever game you are playing. This Node app is responsible for connecting to Beam, parsing reports, sending progress updates, and feeding button presses and axis changes to the virtual controller.

The idea
--------
Usually, integrations for Beam Interactive usually take place through modification of the game itself. For example, Beam's own Minecraft integration (interactive challenges) is a mod, and StreamJar's Minecraft integration (click to spawn) is also a mod. However, for games that are not so easily modded, the general approach has been to use a Node library like "robot" to send key-presses, though this really only works well for autonomous streams.

So, this idea is primarily aimed at those other games that are trickier to mod. However, unlike the implementation described above, it can use multiple fake Xbox controllers. It's slightly trickier to do this, but there are a few advantages here.

* Joysticks are cool. Xbox controllers, obviously, allow us to specifically determine the axis, whereas with a keyboard, we're bound to arrow keys.
* Split screen is possible. In many cases, you can use this to do local multiplayer. This means it's easier in some games to play with/against the streamer.
* Multiple controllers. You can technically connect a bunch of virtual Xbox controllers to the same game, and do local multiplayer this way. While it's trickier to do this right now (since all button presses through Beam Interactive are anonymous), this could be fun to play with in the future.

Setting it up
-------------
As I said, the code here is pretty simple - the hard work is actually being done by vXboxInterface with node-ffi.

To get started, head to the [vBoxInterface releases page](https://github.com/shauleiz/vXboxInterface/releases). Download and install the latest ScpVBus virtual bus, then download vXboxInterface and drop the zip's contents into the `deps` folder.

After you run, `npm install`, put an [OAuth token](https://interactive.beam.pro/request) as `token` and your channel ID as `channel` in `config.json`.

To start, Go Interactive on Beam, and `node .`.