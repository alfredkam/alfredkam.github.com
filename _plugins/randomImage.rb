module Jekyll 
  module Filters 
    def randomImage(output) 
        Dir.glob('assets/img/unsplash/*.jpg').sample { |i| output << "#{i}" }
    end 
  end 
end 