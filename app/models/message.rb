class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :content, presence: true, unless: :have_image?
  mount_uploader :image, ImageUploader

  def have_image?
    image.present?
  end
end
