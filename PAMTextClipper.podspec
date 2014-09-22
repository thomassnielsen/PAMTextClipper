#
# Be sure to run `pod lib lint NAME.podspec' to ensure this is a
# valid spec and remove all comments before submitting the spec.
#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#
Pod::Spec.new do |s|
  s.name             = "PAMTextClipper"
  s.version          = "0.1.9"
  s.summary          = "Javascript for simple copy/paste from a website. Works well with PAMWebBrowser."
  s.homepage         = "http://github.com/PAM-AS/"
  # s.screenshots      = "www.example.com/screenshots_1", "www.example.com/screenshots_2"
  s.license          = 'MIT'
  s.author           = { "thomassnielsen" => "thomas@pam.no" }
  s.source           = { :git => "https://github.com/thomassnielsen/PAMTextClipper.git", :tag => s.version.to_s }
  s.social_media_url = 'https://twitter.com/pam_app'

  # s.platform     = :ios, '5.0'
  # s.ios.deployment_target = '5.0'
  # s.osx.deployment_target = '10.7'
  s.requires_arc = false

  # s.source_files = 'Classes'
  s.resources = 'Assets/textclipper.js'
end
