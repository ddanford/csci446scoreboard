class HighScore < ActiveRecord::Base
  validates :name, presence: true
end
