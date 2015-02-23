+++
template = "post"
title = "PhoneGap Apps + Load External Url"
tags = ["Android", "iOS","phonegap"]
date = "2012-12-17"
url = "phonegap apps load external url"
type = "post"
img = "/img/unsplash/tumblr_n21lq8Tmpl1st5lhmo1_1280.jpg"
+++
<p><strong>To enable access to whitelist domain</strong><br />
http://docs.phonegap.com/en/1.9.0/guide_whitelist_index.md.html</p>
<p><strong>To open site in app itself<br />
for Android</strong></p>
<p>ref: <a href="http://stackoverflow.com/questions/8596772/how-can-i-load-a-webpage-inside-the-phonegap-webview" title="Stackoverflow">Stack Over Flow</a></p>
<p><strong>for iOS</strong><br />
in AppDelegate.m<br />
Change</p>
<p>
<pre class='language-javascript'>
<code>
  - (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType 
  {
    return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
  }
</code>
</pre>
<p>with </p>
<pre class='language-javascript'>
  <code>
      - (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
      {
        NSURL *url = [request URL];
        if ([[url scheme] isEqualToString:@"http"] || [[url scheme] isEqualToString:@"https"]) {
          return YES;
        }
        else {
          return [ super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType ];
        }
      }
</code>
</pre>
<p>
  ref: <a href="http://stackoverflow.com/questions/5911255/phonegap-for-iphone-problem-loading-external-url" title="stack over flow">stack over flow</a>
</p>
<p>
  <strong>if to open site in app and open in browser<br />
in iOS</strong></p>
<pre class='language-javascript'>
  <code>
    - (BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(    UIWebViewNavigationType)navigationType
    {
      NSURL *url = [request URL];
      if ( ([url fragment] != NULL) && ([[url fragment] rangeOfString:@"phonegap=external"].location != NSNotFound))
      {
        if ([[UIApplication sharedApplication] canOpenURL:url]) {
            [[UIApplication sharedApplication] openURL:url];
            return NO;
        }
    }
    return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
}</code>
</pre>
<p>and in the html href include hash <strong>#phonegap=external</strong></p>
<p>ref: <a href="http://www.rigelgroupllc.com/blog/2012/05/22/opening-links-in-phonegap-apps-in-mobile-safari/">reference</a></p>
