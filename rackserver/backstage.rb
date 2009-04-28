# A non-functional test of the Rack framework
# to see how Backstage might fit into the Ruby world.

module Haystack
  module Backstage
    class Server
      
      # ~~~~~~
      # Looks for requests the start in /data
      # ~~~~~
      def self.call(env)
        if env["PATH_INFO"] =~ /^\/data/
          [200, {"Content-Type" => "text/html"}, ["Hello, Backstage!"]]
        else
          [400, {"Content-Type" => "text/html"}, ["Not data"]]
        end
      end #self.call

    end # class Server
  end # module Backstage
end # module Haystack


#
# For testing
require 'rubygems'
require 'rack'
Rack::Handler::Mongrel.run Haystack::Backstage::Server, :Port => 9292
