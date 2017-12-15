class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :content, presence: true, if: :messages_blank?
  mount_uploader :image, ImageUploader


  def messages_blank?
    content == nil && image == nil
  end
end
